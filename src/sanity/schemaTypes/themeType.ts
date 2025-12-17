import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const themeType = defineType({
  name: 'theme',
  title: 'থিম / Theme',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'নাম / Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'স্লাগ / Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'বিবরণ / Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'রঙ / Color',
      type: 'string',
      description: 'Hex color code (e.g., #4a7ec9)',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error(
          'Must be a valid hex color'
        ),
      initialValue: '#4a7ec9',
    }),
    defineField({
      name: 'icon',
      title: 'আইকন / Icon',
      type: 'string',
      description: 'Emoji or icon character (e.g., ⚖️, 🏛️, 📚)',
      initialValue: '📋',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      icon: 'icon',
    },
    prepare(selection) {
      const { title, subtitle, icon } = selection;
      return {
        title: `${icon} ${title}`,
        subtitle,
      };
    },
  },
});
