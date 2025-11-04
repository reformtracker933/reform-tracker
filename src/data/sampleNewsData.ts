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
}

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
export const updatesData = Array.from({ length: 20 }, (_, i) => ({
  id: `update-${i + 1}`,
  title: `Reform Update ${i + 1}: Important changes in policy implementation`,
  category: categories[(i % (categories.length - 1)) + 1],
  href: `/updates/${i + 1}`,
}));
