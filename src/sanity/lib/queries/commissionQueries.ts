import { groq } from "next-sanity";

/**
 * Get all commissions
 */
export const getAllCommissionsQuery = groq`
  *[_type == "commission" && language == $language] | order(name asc) {
    _id,
    name,
    slug,
    fullName,
    description,
    establishedDate,
    website
  }
`;

/**
 * Get single commission by slug
 */
export const getCommissionBySlugQuery = groq`
  *[_type == "commission" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    fullName,
    description,
    establishedDate,
    website,
    language
  }
`;

/**
 * Get commission with their resources and proposals
 */
export const getCommissionWithContentQuery = groq`
  *[_type == "commission" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    fullName,
    description,
    establishedDate,
    website,
    language,
    "resources": *[_type == "resource" && commission._ref == ^._id] | order(publishedDate desc) [0...10] {
      _id,
      title,
      slug,
      publishedDate
    },
    "proposals": *[_type == "proposal" && commission._ref == ^._id] | order(publishedDate desc) [0...10] {
      _id,
      title,
      slug,
      status,
      publishedDate
    }
  }
`;
