import { DocumentPdfIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const resourceType = defineType({
  name: "resource",
  title: "রিসোর্স / Resource",
  type: "document",
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: "title",
      title: "ফাইল শিরোনাম / File Title",
      type: "string",
      description: "ফাইলের প্রদর্শন নাম / Display name for the file",
      validation: (Rule) => Rule.required().min(5).max(200),
    }),
    defineField({
      name: "slug",
      title: "স্লাগ / Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "file",
      title: "ফাইল / File",
      type: "file",
      description:
        "PDF, DOC, DOCX, XLS, XLSX ফাইল আপলোড করুন (সর্বোচ্চ ৫০MB) / Upload files (max 50MB)",
      options: {
        accept: ".pdf,.doc,.docx,.xls,.xlsx",
        storeOriginalFilename: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fileSize",
      title: "ফাইলের আকার / File Size",
      type: "string",
      description: 'উদাঃ "২৫MB" / e.g., "25MB"',
      placeholder: "25MB",
    }),
    defineField({
      name: "category",
      title: "বিভাগ / Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "commission",
      title: "কমিশন / Commission",
      type: "reference",
      to: [{ type: "commission" }],
      description:
        "কোন কমিশন এই রিসোর্স প্রকাশ করেছে / Which commission published this resource",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedDate",
      title: "প্রকাশের তারিখ / Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "description",
      title: "বিবরণ / Description",
      type: "text",
      rows: 3,
      description:
        "রিসোর্সের সংক্ষিপ্ত বিবরণ / Brief description of the resource",
    }),
    defineField({
      name: "color",
      title: "ব্যাজ রঙ / Badge Color",
      type: "string",
      description: "UI ব্যাজের জন্য রঙ / Color for UI badge",
      options: {
        list: [
          { title: "প্রাথমিক / Primary", value: "primary" },
          { title: "সেকেন্ডারি / Secondary", value: "secondary" },
          { title: "সফলতা / Success", value: "success" },
          { title: "সতর্কতা / Warning", value: "warning" },
          { title: "বেগুনি / Purple", value: "purple" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "success",
    }),
    defineField({
      name: "language",
      title: "ভাষা / Language",
      type: "string",
      options: {
        list: [
          { title: "ইংরেজি / English", value: "en" },
          { title: "বাংলা / Bengali", value: "bn" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "bn",
    }),
    defineField({
      name: "thumbnail",
      title: "থাম্বনেইল ইমেজ / Thumbnail Image",
      type: "image",
      description:
        "রিসোর্সের জন্য ঐচ্ছিক প্রিভিউ ইমেজ / Optional preview image for the resource",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      commission: "commission.name",
      category: "category.title",
      language: "language",
    },
    prepare({ title, commission, category, language }) {
      return {
        title: title,
        subtitle: `${commission || "কমিশন নেই / No commission"} - ${category || "বিভাগ নেই / No category"} (${language})`,
      };
    },
  },
  orderings: [
    {
      title: "প্রকাশের তারিখ, নতুন / Published Date, New",
      name: "publishedDateDesc",
      by: [{ field: "publishedDate", direction: "desc" }],
    },
    {
      title: "শিরোনাম ক-য / Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
