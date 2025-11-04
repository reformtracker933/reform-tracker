import { groq } from "next-sanity";

/**
 * Get all categories
 */
export const getAllCategoriesQuery = groq`
  *[_type == "category" && language == $language] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    type
  }
`;

/**
 * Get categories by type (news, update, proposal, resource, all)
 */
export const getCategoriesByTypeQuery = groq`
  *[_type == "category" && (type == $type || type == "all") && language == $language] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    type
  }
`;

/**
 * Get single category by slug
 */
export const getCategoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    color,
    type,
    language
  }
`;
