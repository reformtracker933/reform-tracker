import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "বিভাগ / Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "শিরোনাম / Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
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
    }),
    defineField({
      name: "color",
      title: "ব্যাজ রঙ / Badge Color",
      type: "string",
      description: "UI ব্যাজের জন্য রঙ / Color for UI badges",
      options: {
        list: [
          { title: "প্রাথমিক / Primary", value: "primary" },
          { title: "সেকেন্ডারি / Secondary", value: "secondary" },
          { title: "সফলতা / Success", value: "success" },
          { title: "সতর্কতা / Warning", value: "warning" },
          { title: "বেগুনি / Purple", value: "purple" },
        ],
      },
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
      name: "type",
      title: "বিভাগের ধরন / Category Type",
      type: "string",
      description:
        "এই বিভাগটি কোন ধরনের কন্টেন্টের জন্য / Which content type this category is for",
      options: {
        list: [
          { title: "সংবাদ / News", value: "news" },
          { title: "আপডেট / Update", value: "update" },
          { title: "প্রস্তাব / Proposal", value: "proposal" },
          { title: "রিসোর্স / Resource", value: "resource" },
          { title: "সব ধরনের / All Types", value: "all" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      language: "language",
    },
    prepare({ title, subtitle, language }) {
      return {
        title: title,
        subtitle: `${subtitle} (${language})`,
      };
    },
  },
});
