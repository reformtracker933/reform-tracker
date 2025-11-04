import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "লেখক / Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "নাম / Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "slug",
      title: "স্লাগ / Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "প্রোফাইল ছবি / Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "জীবনী / Biography",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "language",
      title: "প্রাথমিক ভাষা / Primary Language",
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
  ],
  preview: {
    select: {
      title: "name",
      media: "avatar",
      language: "language",
    },
    prepare({ title, media, language }) {
      return {
        title: title,
        subtitle: language === "bn" ? "বাংলা / Bengali" : "ইংরেজি / English",
        media: media,
      };
    },
  },
});
