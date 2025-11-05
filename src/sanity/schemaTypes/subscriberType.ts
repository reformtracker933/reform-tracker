import { defineField, defineType } from "sanity";

export const subscriberType = defineType({
  name: "subscriber",
  title: "Newsletter Subscribers",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Optional subscriber name",
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "isActive",
      title: "Active Subscription",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "source",
      title: "Subscription Source",
      type: "string",
      options: {
        list: [
          { title: "Newsletter Section", value: "newsletter" },
          { title: "Navbar", value: "navbar" },
          { title: "Mobile Nav", value: "mobile-nav" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "name",
      status: "isActive",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      return {
        title: title,
        subtitle: subtitle
          ? `${subtitle} - ${status ? "Active" : "Inactive"}`
          : status
            ? "Active"
            : "Inactive",
      };
    },
  },
});
