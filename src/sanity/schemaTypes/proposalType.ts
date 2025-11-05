import { ClipboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const proposalType = defineType({
  name: "proposal",
  title: "প্রস্তাব / Proposal",
  type: "document",
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: "title",
      title: "প্রস্তাবের শিরোনাম / Proposal Title",
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
      type: "blockContent",
      description: "সম্পূর্ণ প্রস্তাবের বিস্তারিত / Full proposal details",
    }),
    defineField({
      name: "commission",
      title: "কমিশন / Commission",
      type: "reference",
      to: [{ type: "commission" }],
      description:
        "ড্রপডাউন থেকে কমিশন নির্বাচন করুন / Select commission from dropdown",
      validation: (Rule) => Rule.required(),
      options: {
        disableNew: true,
        filter: "_type == 'commission'",
      },
    }),
    defineField({
      name: "category",
      title: "বিভাগ / Category",
      type: "reference",
      to: [{ type: "category" }],
      description:
        "ড্রপডাউন থেকে বিভাগ নির্বাচন করুন / Select category from dropdown",
      validation: (Rule) => Rule.required(),
      options: {
        disableNew: true,
        filter: "_type == 'category'",
      },
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
      initialValue: "success",
    }),
    defineField({
      name: "publishedDate",
      title: "প্রকাশের তারিখ / Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "স্ট্যাটাস / Status",
      type: "string",
      options: {
        list: [
          { title: "চলমান / Running", value: "running" },
          { title: "সম্পন্ন / Completed", value: "completed" },
          { title: "পূর্ব-পরিকল্পিত / Pre-planned", value: "preplanned" },
          { title: "বহিষ্কৃত / Expelled", value: "expelled" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "running",
    }),
    defineField({
      name: "partyPositions",
      title: "দলের অবস্থান / Party Positions",
      type: "array",
      description:
        "এই প্রস্তাবে প্রতিটি রাজনৈতিক দল কীভাবে ভোট দিয়েছে / How each political party voted on this proposal",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "party",
              title: "রাজনৈতিক দল / Political Party",
              type: "reference",
              to: [{ type: "politicalParty" }],
              description:
                "ড্রপডাউন থেকে দল নির্বাচন করুন / Select party from dropdown",
              validation: (Rule) => Rule.required(),
              options: {
                disableNew: true,
                filter: "_type == 'politicalParty'",
              },
            },
            {
              name: "stance",
              title: "অবস্থান / Stance",
              type: "string",
              options: {
                list: [
                  { title: "সমর্থন / Support", value: "support" },
                  { title: "বিরুদ্ধে / Against", value: "against" },
                  { title: "নিরপেক্ষ / Neutral", value: "neutral" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "votingDate",
              title: "ভোটের তারিখ / Voting Date",
              type: "datetime",
            },
          ],
          preview: {
            select: {
              party: "party.name",
              stance: "stance",
            },
            prepare({ party, stance }) {
              return {
                title: party || "দল নেই / No party",
                subtitle: stance || "অবস্থান নেই / No stance",
              };
            },
          },
        },
      ],
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
      title: "title",
      status: "status",
      commission: "commission.name",
      language: "language",
    },
    prepare({ title, status, commission, language }) {
      return {
        title: title,
        subtitle: `${status || "স্ট্যাটাস নেই / No status"} - ${commission || "কমিশন নেই / No commission"} (${language})`,
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
      title: "স্ট্যাটাস / Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
