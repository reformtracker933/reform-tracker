/**
 * Format date without timezone conversion issues
 * Extracts the date part from ISO string to avoid timezone shifts
 */
export function formatDate(dateString: string, locale: "bn" | "en"): string {
  // Extract just the date part (YYYY-MM-DD) to avoid timezone issues
  const datePart = dateString.split("T")[0];
  const [year, month, day] = datePart.split("-");

  if (locale === "bn") {
    // Convert to Bengali numerals
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const bnDate = `${day}/${month}/${year}`
      .split("")
      .map((char) => (/\d/.test(char) ? bnDigits[parseInt(char)] : char))
      .join("");
    return bnDate;
  } else {
    // Return in MM/DD/YYYY format for English
    return `${month}/${day}/${year}`;
  }
}
