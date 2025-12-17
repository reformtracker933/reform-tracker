import { UsersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const politicalPartyType = defineType({
  name: 'politicalParty',
  title: 'রাজনৈতিক দল / Political Party',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'সংক্ষিপ্ত নাম / Short Name',
      type: 'string',
      description: 'উদাঃ বিএনপি, এনসিপি, জামাত / e.g., BNP, NCP, Jamat',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'সম্পূর্ণ নাম / Full Name',
      type: 'string',
      description: 'সম্পূর্ণ দলের নাম / Complete official party name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'লোগো / Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'color',
      title: 'রঙ / Color',
      type: 'string',
      description: 'Hex color code (e.g., #006747)',
      validation: (Rule) =>
        Rule.required()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
          .error('Must be a valid hex color'),
      initialValue: '#4a7ec9',
    }),
    defineField({
      name: 'description',
      title: 'বিবরণ / Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'established',
      title: 'প্রতিষ্ঠিত / Established',
      type: 'date',
      description: 'দল প্রতিষ্ঠার তারিখ / Party establishment date',
    }),
    defineField({
      name: 'statistics',
      title: 'পরিসংখ্যান / Statistics',
      type: 'object',
      fields: [
        {
          name: 'totalStatements',
          title: 'মোট বিবৃতি / Total Statements',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'approved',
          title: 'অনুমোদিত / Approved',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'rejected',
          title: 'প্রত্যাখ্যাত / Rejected',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'completionPercentage',
          title: 'সম্পূর্ণতার শতাংশ / Completion Percentage',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(100),
        },
        {
          name: 'pendingPercentage',
          title: 'বিচারাধীন শতাংশ / Pending Percentage',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(100),
        },
      ],
      validation: (Rule) =>
        Rule.custom((statistics) => {
          if (!statistics) return true;
          const {
            approved,
            rejected,
            totalStatements,
            completionPercentage,
            pendingPercentage,
          } = statistics as {
            approved: number;
            rejected: number;
            totalStatements: number;
            completionPercentage: number;
            pendingPercentage: number;
          };
          if (approved + rejected > totalStatements) {
            return 'অনুমোদিত + প্রত্যাখ্যাত মোট বিবৃতি অতিক্রম করতে পারবে না / Approved + Rejected cannot exceed Total Statements';
          }
          if (completionPercentage + pendingPercentage !== 100) {
            return 'সম্পূর্ণ + বিচারাধীন শতাংশ ১০০% হতে হবে / Completion + Pending percentages must equal 100%';
          }
          return true;
        }),
    }),
    defineField({
      name: 'annualData',
      title: 'বার্ষিক তুলনা ডেটা / Annual Comparison Data',
      type: 'array',
      description: 'বার চার্ট তুলনার জন্য ডেটা / Data for bar chart comparison',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'বছর / Year',
              type: 'string',
              description: 'উদাঃ "২০২৪-২০২৫" / e.g., "2024-2025"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'acceptable',
              title: 'গ্রহণযোগ্য সংখ্যা / Acceptable Count',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'unacceptable',
              title: 'অগ্রহণযোগ্য সংখ্যা / Unacceptable Count',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
          ],
          preview: {
            select: {
              title: 'year',
              acceptable: 'acceptable',
              unacceptable: 'unacceptable',
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
      name: 'displayOrder',
      title: 'প্রদর্শনের ক্রম / Display Order',
      type: 'number',
      description:
        'চার্টে প্রদর্শনের ক্রম (ছোট সংখ্যা = প্রথম) / Order for display in charts (lower number = first)',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'fullName',
      media: 'logo',
    },
  },
  orderings: [
    {
      title: 'প্রদর্শনের ক্রম / Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
});
