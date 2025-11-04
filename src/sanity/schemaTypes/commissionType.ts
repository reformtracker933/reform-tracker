import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const commissionType = defineType({
  name: "commission",
  title: "কমিশন / Commission",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "name",
      title: "কমিশনের নাম / Commission Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
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
      name: "fullName",
      title: "সম্পূর্ণ সরকারী নাম / Full Official Name",
      type: "string",
      description:
        "কমিশনের সম্পূর্ণ সরকারি নাম / Complete official commission name",
    }),
    defineField({
      name: "description",
      title: "বিবরণ / Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "establishedDate",
      title: "প্রতিষ্ঠার তারিখ / Established Date",
      type: "date",
    }),
    defineField({
      name: "website",
      title: "ওয়েবসাইট URL / Website URL",
      type: "url",
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
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "fullName",
    },
  },
});
