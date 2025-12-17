import { UsersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Simplified political party type for commission reports
 * This contains only basic information needed for commission report sections
 */
export const commissionPartyType = defineType({
  name: 'commissionParty',
  title: 'কমিশন দল / Commission Party',
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'fullName',
      media: 'logo',
    },
  },
});
