#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANGUAGES_DIR = path.join(__dirname, "../src/data/languages");
const TYPES_OUTPUT = path.join(
  __dirname,
  "../src/types/translations.generated.ts",
);

interface JsonFile {
  name: string;
  path: string;
}

interface FileType {
  name: string;
  typeName: string;
  content: Record<string, unknown>;
}

function generateTypeFromObject(
  obj: Record<string, unknown>,
  indentLevel = 0,
): string {
  const indent = "  ".repeat(indentLevel);
  const entries = Object.entries(obj);

  if (entries.length === 0) return "{}";

  const lines = entries.map(([key, value]) => {
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;

    if (value === null) {
      return `${indent}  ${safeKey}: null;`;
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        return `${indent}  ${safeKey}: never[];`;
      }
      const firstItem = value[0];
      if (typeof firstItem === "object" && firstItem !== null) {
        const itemType = generateTypeFromObject(
          firstItem as Record<string, unknown>,
          indentLevel + 1,
        );
        return `${indent}  ${safeKey}: ${itemType}[];`;
      }
      return `${indent}  ${safeKey}: ${typeof firstItem}[];`;
    } else if (typeof value === "object") {
      const nestedType = generateTypeFromObject(
        value as Record<string, unknown>,
        indentLevel + 1,
      );
      return `${indent}  ${safeKey}: ${nestedType};`;
    } else {
      return `${indent}  ${safeKey}: ${typeof value};`;
    }
  });

  return `{\n${lines.join("\n")}\n${indent}}`;
}

function getAllJsonFiles(dir: string, locale: string): JsonFile[] {
  const localeDir = path.join(dir, locale);
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      name: file.replace(".json", ""),
      path: path.join(localeDir, file),
    }));
}

function generateTypes(): void {
  console.log("🔄 Generating translation types...");

  const enFiles = getAllJsonFiles(LANGUAGES_DIR, "en");

  if (enFiles.length === 0) {
    console.error("❌ No JSON files found in src/data/languages/en/");
    process.exit(1);
  }

  let output = `// AUTO-GENERATED - DO NOT EDIT
// Generated: ${new Date().toISOString()}
// Run 'pnpm generate:types' to regenerate

`;

  const fileTypes: FileType[] = [];
  const pageKeys: string[] = [];

  enFiles.forEach(({ name, path: filePath }) => {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Record<
        string,
        unknown
      >;
      const typeName =
        name === "RTL"
          ? "RTLTranslations"
          : `${name.charAt(0).toUpperCase()}${name.slice(1)}Translations`;

      output += `export type ${typeName} = ${generateTypeFromObject(content)};\n\n`;

      fileTypes.push({ name, typeName, content });
    } catch (error) {
      const err = error as Error;
      console.error(`❌ Error processing ${name}.json:`, err.message);
      process.exit(1);
    }
  });

  output += `export interface TranslationPages {\n`;

  fileTypes.forEach(({ name, content }) => {
    if (name === "RTL") {
      Object.keys(content).forEach((pageKey) => {
        output += `  ${pageKey}: RTLTranslations['${pageKey}'];\n`;
        pageKeys.push(pageKey);
      });
    } else {
      const typeName = `${name.charAt(0).toUpperCase()}${name.slice(1)}Translations`;
      output += `  ${name}: ${typeName};\n`;
      pageKeys.push(name);
    }
  });

  output += `}\n\n`;
  output += `export type PageKey = keyof TranslationPages;\n\n`;
  output += `export type GetPageTranslation<T extends PageKey> = TranslationPages[T];\n`;

  fs.writeFileSync(TYPES_OUTPUT, output, "utf-8");

  console.log("✅ Translation types generated successfully!");
  console.log(`📝 Output: ${TYPES_OUTPUT}`);
  console.log(
    `📊 Generated types for ${pageKeys.length} pages: ${pageKeys.join(", ")}`,
  );
}

try {
  generateTypes();
} catch (error) {
  const err = error as Error;
  console.error("❌ Error generating types:", err);
  process.exit(1);
}
