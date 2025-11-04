import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const newsArticleType = defineType({
  name: "newsArticle",
  title: "সংবাদ নিবন্ধ / News Article",
  type: "document",
  icon: DocumentTextIcon,
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
      name: "excerpt",
      title: "সংক্ষিপ্ত বিবরণ / Excerpt",
      type: "text",
      rows: 3,
      description:
        "প্রিভিউয়ের জন্য সংক্ষিপ্ত বিবরণ (সর্বোচ্চ ৩০০ অক্ষর) / Short description for preview (max 300 characters)",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "body",
      title: "মূল কন্টেন্ট / Body Content",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "ফিচার ইমেজ / Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "বিকল্প টেক্সট / Alternative Text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "লেখক / Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "বিভাগ / Category",
      type: "reference",
      to: [{ type: "category" }],
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
      name: "isFeatured",
      title: "হোমপেজে ফিচার করুন / Featured on Homepage",
      type: "boolean",
      description:
        "হোমপেজের ফিচার সংবাদ বিভাগে এই নিবন্ধটি প্রদর্শন করুন / Display this article in the featured news section",
      initialValue: false,
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
      name: "tags",
      title: "ট্যাগ / Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featuredImage",
      language: "language",
    },
    prepare({ title, author, media, language }) {
      return {
        title: title,
        subtitle: `${author || "লেখক নেই / No author"} (${language})`,
        media: media,
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
      title: "প্রকাশের তারিখ, পুরাতন / Published Date, Old",
      name: "publishedDateAsc",
      by: [{ field: "publishedDate", direction: "asc" }],
    },
  ],
});
