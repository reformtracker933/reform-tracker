import { ChartUpwardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const dashboardStatsType = defineType({
  name: "dashboardStats",
  title: "ড্যাশবোর্ড পরিসংখ্যান / Dashboard Statistics",
  type: "document",
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: "title",
      title: "শিরোনাম / Title",
      type: "string",
      description: "অভ্যন্তরীণ রেফারেন্স নাম / Internal reference name",
      validation: (Rule) => Rule.required(),
      initialValue: "Dashboard Statistics",
    }),
    defineField({
      name: "totalProposals",
      title: "মোট প্রস্তাব / Total Proposals",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "totalCommissions",
      title: "মোট কমিশন / Total Commissions",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "proposalsDelta",
      title: "প্রস্তাব পরিবর্তন / Proposals Delta",
      type: "string",
      description:
        'শতাংশ পরিবর্তন (উদাঃ "১২%") / Percentage change (e.g., "12%")',
      placeholder: "12%",
      initialValue: "0%",
    }),
    defineField({
      name: "commissionsDelta",
      title: "কমিশন পরিবর্তন / Commissions Delta",
      type: "string",
      description:
        'শতাংশ পরিবর্তন (উদাঃ "৮%") / Percentage change (e.g., "8%")',
      placeholder: "8%",
      initialValue: "0%",
    }),
    defineField({
      name: "statusBreakdown",
      title: "স্ট্যাটাস বিভাজন (বার চার্ট) / Status Breakdown (Bar Chart)",
      type: "array",
      description:
        "স্ট্যাটাস বার চার্টের জন্য ডেটা / Data for the status bar chart",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "status",
              title: "স্ট্যাটাস / Status",
              type: "string",
              options: {
                list: [
                  { title: "চলমান / Running", value: "running" },
                  { title: "সম্পন্ন / Completed", value: "completed" },
                  {
                    title: "পূর্ব-পরিকল্পিত / Pre-planned",
                    value: "preplanned",
                  },
                  { title: "বহিষ্কৃত / Expelled", value: "expelled" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "count",
              title: "সংখ্যা / Count",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: "label_en",
              title: "লেবেল (ইংরেজি) / Label (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "label_bn",
              title: "লেবেল (বাংলা) / Label (Bengali)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              status: "status",
              count: "count",
              label: "label_en",
            },
            prepare({ status, count, label }) {
              return {
                title: label || status,
                subtitle: `সংখ্যা / Count: ${count}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "sectorBreakdown",
      title: "সেক্টর বিভাজন (ডোনাট চার্ট) / Sector Breakdown (Doughnut Chart)",
      type: "array",
      description:
        "সেক্টর ডোনাট চার্টের জন্য ডেটা / Data for the sector doughnut chart",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "sectorName_en",
              title: "সেক্টরের নাম (ইংরেজি) / Sector Name (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "sectorName_bn",
              title: "সেক্টরের নাম (বাংলা) / Sector Name (Bengali)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "value",
              title: "মান / Value",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: "color",
              title: "রঙ / Color",
              type: "string",
              description: "হেক্স রঙ কোড / Hex color code",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              sector: "sectorName_en",
              value: "value",
            },
            prepare({ sector, value }) {
              return {
                title: sector,
                subtitle: `মান / Value: ${value}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "lastUpdated",
      title: "শেষ আপডেট / Last Updated",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "isActive",
      title: "সক্রিয় / Is Active",
      type: "boolean",
      description:
        "একসাথে শুধুমাত্র একটি ড্যাশবোর্ড পরিসংখ্যান ডকুমেন্ট সক্রিয় হওয়া উচিত / Only one dashboard stats document should be active at a time",
      validation: (Rule) => Rule.required(),
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      lastUpdated: "lastUpdated",
    },
    prepare({ title, isActive, lastUpdated }) {
      return {
        title: title,
        subtitle: `${isActive ? "✅ সক্রিয় / Active" : "❌ নিষ্ক্রিয় / Inactive"} - আপডেট / Updated: ${new Date(lastUpdated).toLocaleDateString()}`,
      };
    },
  },
});
