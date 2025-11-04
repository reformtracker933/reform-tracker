import { newsSectionCardImage } from "@/assets";

// Categories and writers data
export const categories = [
  "All Categories",
  "Policy",
  "Healthcare",
  "Education",
  "Economy",
];

export const writers = ["All Writers", "ডেভিড স্মিথ"];

export interface NewsCard {
  id: string;
  title: string;
  description: string;
  image: string;
  writer: string;
  date: string;
  category: string;
}

export interface UpdateCard {
  id: string;
  title: string;
  category: string;
  href: string;
  color: string;
}

const categoryColors: Record<string, string> = {
  Policy: "#4a7ec9",
  Healthcare: "#31b36b",
  Education: "#f9d262",
  Economy: "#deaaef",
};

// Sample news data
export const newsData = Array.from({ length: 24 }, (_, i) => ({
  id: `news-${i + 1}`,
  title: "জাতীয় নির্বাচন ২০২৫: নতুন প্রত্যাশা, পুরনো চ্যালেঞ্জ",
  description:
    "এই নির্বাচনে ভোটারদের আগ্রহ আগের চেয়ে বেশি। রাজনৈতিক দলগুলো প্রচারণায় নতুন প্রতিশ্রুতি দিচ্ছে, আর প্রশাসন প্রস্তুতি নিচ্ছে স্বচ্ছ ও শান্তিপূর্ণ ভোট নিশ্চিত করতে.আরো.।",
  image: `${newsSectionCardImage}`,
  writer: writers[(i % (writers.length - 1)) + 1],
  date: "ফেব্রুয়ারী 27,2025",
  category: categories[(i % (categories.length - 1)) + 1],
}));

//Sample updates data
export const updatesData = Array.from({ length: 20 }, (_, i) => {
  const category = categories[(i % (categories.length - 1)) + 1];
  return {
    id: `update-${i + 1}`,
    title: `সংস্কার আপডেট ${i + 1}: নীতি বাস্তবায়নে গুরুত্বপূর্ণ পরিবর্তন`,
    category,
    href: `/updates/${i + 1}`,
    color: categoryColors[category] || "#e83231",
  };
});
