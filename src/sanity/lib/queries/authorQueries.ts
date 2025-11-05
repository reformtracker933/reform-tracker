import { groq } from "next-sanity";

/**
 * Get all authors
 */
export const getAllAuthorsQuery = groq`
  *[_type == "author" && language == $language] | order(name asc) {
    _id,
    name,
    slug,
    "avatar": avatar.asset->url,
    bio
  }
`;

/**
 * Get single author by slug
 */
export const getAuthorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    "avatar": avatar.asset->url,
    bio,
    language
  }
`;

/**
 * Get author with their articles
 */
export const getAuthorWithArticlesQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    "avatar": avatar.asset->url,
    bio,
    language,
    "articles": *[_type == "newsArticle" && author._ref == ^._id] | order(publishedDate desc) [0...10] {
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      publishedDate
    }
  }
`;
