import { ControlsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const chartConfigType = defineType({
  name: "chartConfig",
  title: "চার্ট কনফিগারেশন / Chart Configuration",
  type: "document",
  icon: ControlsIcon,
  fields: [
    defineField({
      name: "name",
      title: "কনফিগারেশন নাম / Configuration Name",
      type: "string",
      description:
        'উদাঃ "ড্যাশবোর্ড বার চার্ট", "দলের পরিসংখ্যান ডোনাট" / e.g., "Dashboard Bar Chart"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "chartType",
      title: "চার্টের ধরন / Chart Type",
      type: "string",
      options: {
        list: [
          { title: "বার চার্ট / Bar Chart", value: "bar" },
          { title: "ডোনাট চার্ট / Doughnut Chart", value: "doughnut" },
          { title: "লাইন চার্ট / Line Chart", value: "line" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "chartId",
      title: "চার্ট আইডি / Chart ID",
      type: "string",
      description:
        "এই চার্ট কনফিগারেশনের জন্য অনন্য শনাক্তকারী / Unique identifier for this chart",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorScheme",
      title: "রঙের স্কিম / Color Scheme",
      type: "array",
      description: "হেক্স রঙ কোডের অ্যারে / Array of hex color codes",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "labels",
      title: "চার্ট লেবেল / Chart Labels",
      type: "object",
      fields: [
        {
          name: "title_en",
          title: "শিরোনাম (ইংরেজি) / Title (English)",
          type: "string",
        },
        {
          name: "title_bn",
          title: "শিরোনাম (বাংলা) / Title (Bengali)",
          type: "string",
        },
        {
          name: "subtitle_en",
          title: "উপশিরোনাম (ইংরেজি) / Subtitle (English)",
          type: "string",
        },
        {
          name: "subtitle_bn",
          title: "উপশিরোনাম (বাংলা) / Subtitle (Bengali)",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "options",
      title: "চার্ট অপশন / Chart Options",
      type: "object",
      fields: [
        {
          name: "showLegend",
          title: "লেজেন্ড দেখান / Show Legend",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "showTooltip",
          title: "টুলটিপ দেখান / Show Tooltip",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "cutoutPercentage",
          title: "কাটআউট শতাংশ (ডোনাট) / Cutout Percentage (Doughnut)",
          type: "number",
          description:
            "ডোনাট চার্টের জন্য (০-১০০) / For doughnut charts (0-100)",
          validation: (Rule) => Rule.min(0).max(100),
        },
        {
          name: "barBorderRadius",
          title: "বার বর্ডার রেডিয়াস / Bar Border Radius",
          type: "number",
          description:
            "বার চার্টের জন্য পিক্সেলে বর্ডার রেডিয়াস / Border radius for bar charts in pixels",
        },
      ],
    }),
    defineField({
      name: "isActive",
      title: "সক্রিয় / Is Active",
      type: "boolean",
      description:
        "এই চার্ট কনফিগারেশন সক্ষম/নিষ্ক্রিয় করুন / Enable/disable this chart configuration",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      chartType: "chartType",
      isActive: "isActive",
    },
    prepare({ title, chartType, isActive }) {
      return {
        title: title,
        subtitle: `${chartType} - ${isActive ? "✅ সক্রিয় / Active" : "❌ নিষ্ক্রিয় / Inactive"}`,
      };
    },
  },
});
