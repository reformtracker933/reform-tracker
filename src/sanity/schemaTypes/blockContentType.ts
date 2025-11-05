import { defineType, defineArrayMember } from "sanity";
import { ImageIcon } from "@sanity/icons";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: "ব্লক কন্টেন্ট / Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "সাধারণ / Normal", value: "normal" },
        { title: "শিরোনাম ১ / H1", value: "h1" },
        { title: "শিরোনাম ২ / H2", value: "h2" },
        { title: "শিরোনাম ৩ / H3", value: "h3" },
        { title: "শিরোনাম ৪ / H4", value: "h4" },
        { title: "উদ্ধৃতি / Quote", value: "blockquote" },
      ],
      lists: [{ title: "বুলেট / Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: "গাঢ় / Strong", value: "strong" },
          { title: "জোর / Emphasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "ইউআরএল / URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "ইউআরএল / URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "বিকল্প টেক্সট / Alternative Text",
        },
      ],
    }),
  ],
});
