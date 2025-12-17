import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const commissionReportType = defineType({
  name: 'commissionReport',
  title: 'কমিশন রিপোর্ট / Commission Report',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'শিরোনাম / Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'স্লাগ / Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'ফিচার ইমেজ / Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'বিকল্প টেক্সট / Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'সংক্ষিপ্ত বিবরণ / Excerpt',
      type: 'text',
      rows: 3,
      description:
        'সংক্ষিপ্ত বিবরণ (সর্বোচ্চ ২০০ অক্ষর) / Brief description (max 200 characters)',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'publishedDate',
      title: 'প্রকাশের তারিখ / Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'স্ট্যাটাস / Status',
      type: 'string',
      options: {
        list: [
          { title: 'খসড়া / Draft', value: 'draft' },
          { title: 'প্রকাশিত / Published', value: 'published' },
          { title: 'আর্কাইভ / Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'draft',
    }),
    defineField({
      name: 'themes',
      title: 'থিম ও বিভাগ / Themes & Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'theme',
              title: 'থিম / Theme',
              type: 'reference',
              to: [{ type: 'theme' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'sections',
              title: 'বিভাগ / Sections',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'বিভাগের শিরোনাম / Section Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'content',
                      title: 'কন্টেন্ট / Content',
                      type: 'blockContent',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'politicalParties',
                      title: 'রাজনৈতিক দল / Political Parties',
                      type: 'array',
                      description:
                        'যে দলগুলো এই বিভাগকে সমর্থন করে / Parties supporting this section',
                      of: [
                        {
                          type: 'reference',
                          to: [{ type: 'commissionParty' }],
                        },
                      ],
                    },
                    {
                      name: 'order',
                      title: 'ক্রম / Order',
                      type: 'number',
                      validation: (Rule) => Rule.required().min(1),
                      initialValue: 1,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      order: 'order',
                    },
                    prepare({ title, order }) {
                      return {
                        title: `${order}. ${title}`,
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              themeName: 'theme.name',
              themeIcon: 'theme.icon',
              sectionsCount: 'sections.length',
            },
            prepare({ themeName, themeIcon, sectionsCount }) {
              return {
                title: `${themeIcon || '📋'} ${themeName}`,
                subtitle: `${sectionsCount || 0} sections`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'ট্যাগ / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'ফিচার করুন / Featured',
      type: 'boolean',
      description: 'হোমপেজে প্রদর্শন করুন / Display on homepage',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'প্রকাশের তারিখ (নতুন প্রথম) / Published Date (Newest)',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }],
    },
    {
      title: 'শিরোনাম (A-Z) / Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      status: 'status',
      isFeatured: 'isFeatured',
    },
    prepare({ title, media, status, isFeatured }) {
      return {
        title: `${isFeatured ? '⭐ ' : ''}${title}`,
        subtitle: status === 'published' ? '✓ Published' : status,
        media,
      };
    },
  },
});
