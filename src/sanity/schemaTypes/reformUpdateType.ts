import { BellIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const reformUpdateType = defineType({
  name: "reformUpdate",
  title: "সংস্কার আপডেট / Reform Update",
  type: "document",
  icon: BellIcon,
  fields: [
    defineField({
      name: "title",
      title: "শিরোনাম / Title",
      type: "string",
      validation: (Rule) => Rule.required().min(10).max(200),
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
      name: "description",
      title: "বিবরণ / Description",
      type: "text",
      rows: 3,
      description: "আপডেটের সংক্ষিপ্ত বিবরণ / Brief description of the update",
    }),
    defineField({
      name: "category",
      title: "বিভাগ / Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
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
      initialValue: "primary",
    }),
    defineField({
      name: "publishedDate",
      title: "প্রকাশের তারিখ / Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "priority",
      title: "অগ্রাধিকার / Priority",
      type: "number",
      description:
        "উচ্চ সংখ্যা = উচ্চ অগ্রাধিকার / Higher number = higher priority",
      validation: (Rule) => Rule.required().min(0).max(100),
      initialValue: 50,
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
      name: "relatedArticles",
      title: "সম্পর্কিত নিবন্ধ / Related Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "newsArticle" }] }],
      description:
        "সম্পর্কিত সংবাদ নিবন্ধের লিঙ্ক / Link to related news articles",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      language: "language",
      priority: "priority",
    },
    prepare({ title, category, language, priority }) {
      return {
        title: title,
        subtitle: `${category || "বিভাগ নেই / No category"} (${language}) - অগ্রাধিকার / Priority: ${priority}`,
      };
    },
  },
  orderings: [
    {
      title: "অগ্রাধিকার, উচ্চ থেকে নিম্ন / Priority, High to Low",
      name: "priorityDesc",
      by: [{ field: "priority", direction: "desc" }],
    },
    {
      title: "প্রকাশের তারিখ, নতুন / Published Date, New",
      name: "publishedDateDesc",
      by: [{ field: "publishedDate", direction: "desc" }],
    },
  ],
});
