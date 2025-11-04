import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const politicalPartyType = defineType({
  name: "politicalParty",
  title: "রাজনৈতিক দল / Political Party",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "দলের নাম / Party Name",
      type: "string",
      description:
        "সংক্ষিপ্ত নাম (উদাঃ বিএনপি, এনসিপি, জামাত) / Short name (e.g., BNP, NCP, Jamat)",
      validation: (Rule) => Rule.required().min(2).max(50),
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
      title: "সম্পূর্ণ দলের নাম / Full Party Name",
      type: "string",
      description: "সম্পূর্ণ সরকারি দলের নাম / Complete official party name",
    }),
    defineField({
      name: "logo",
      title: "দলের লোগো / Party Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "color",
      title: "দলের ব্র্যান্ড রঙ / Party Brand Color",
      type: "string",
      description: "UI প্রতিনিধিত্বের জন্য রঙ / Color for UI representation",
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
    }),
    defineField({
      name: "description",
      title: "বিবরণ / Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "established",
      title: "প্রতিষ্ঠার তারিখ / Establishment Date",
      type: "date",
    }),
    defineField({
      name: "statistics",
      title: "দলের পরিসংখ্যান / Party Statistics",
      type: "object",
      description:
        "ডোনাট চার্ট প্রদর্শনের জন্য পরিসংখ্যান / Statistics for doughnut chart display",
      fields: [
        {
          name: "totalStatements",
          title: "মোট বিবৃতি / Total Statements",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "approved",
          title: "অনুমোদিত / Approved",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "rejected",
          title: "প্রত্যাখ্যাত / Rejected",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "completionPercentage",
          title: "সম্পূর্ণ শতাংশ / Completion Percentage",
          type: "number",
          description:
            "ডোনাট চার্টের জন্য শতাংশ (০-১০০) / Percentage for doughnut chart (0-100)",
          validation: (Rule) => Rule.required().min(0).max(100),
        },
        {
          name: "pendingPercentage",
          title: "বিচারাধীন শতাংশ / Pending Percentage",
          type: "number",
          description:
            "ডোনাট চার্টের জন্য শতাংশ (০-১০০) / Percentage for doughnut chart (0-100)",
          validation: (Rule) => Rule.required().min(0).max(100),
        },
      ],
      validation: (Rule) =>
        Rule.custom(
          (
            statistics:
              | {
                  approved: number;
                  rejected: number;
                  totalStatements: number;
                  completionPercentage: number;
                  pendingPercentage: number;
                }
              | undefined,
          ) => {
            if (!statistics) return true;
            const {
              approved,
              rejected,
              totalStatements,
              completionPercentage,
              pendingPercentage,
            } = statistics;
            if (approved + rejected > totalStatements) {
              return "অনুমোদিত + প্রত্যাখ্যাত মোট বিবৃতি অতিক্রম করতে পারবে না / Approved + Rejected cannot exceed Total Statements";
            }
            if (completionPercentage + pendingPercentage !== 100) {
              return "সম্পূর্ণ + বিচারাধীন শতাংশ ১০০% হতে হবে / Completion + Pending percentages must equal 100%";
            }
            return true;
          },
        ),
    }),
    defineField({
      name: "annualData",
      title: "বার্ষিক তুলনা ডেটা / Annual Comparison Data",
      type: "array",
      description: "বার চার্ট তুলনার জন্য ডেটা / Data for bar chart comparison",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "year",
              title: "বছর / Year",
              type: "string",
              description: 'উদাঃ "২০২৪-২০২৫" / e.g., "2024-2025"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "acceptable",
              title: "গ্রহণযোগ্য সংখ্যা / Acceptable Count",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: "unacceptable",
              title: "অগ্রহণযোগ্য সংখ্যা / Unacceptable Count",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
          ],
          preview: {
            select: {
              title: "year",
              acceptable: "acceptable",
              unacceptable: "unacceptable",
            },
            prepare({ title, acceptable, unacceptable }) {
              return {
                title: title,
                subtitle: `গ্রহণযোগ্য / Acceptable: ${acceptable}, অগ্রহণযোগ্য / Unacceptable: ${unacceptable}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "displayOrder",
      title: "প্রদর্শনের ক্রম / Display Order",
      type: "number",
      description:
        "চার্টে প্রদর্শনের ক্রম (ছোট সংখ্যা = প্রথম) / Order for display in charts (lower number = first)",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "fullName",
      media: "logo",
    },
  },
  orderings: [
    {
      title: "প্রদর্শনের ক্রম / Display Order",
      name: "displayOrder",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
});
