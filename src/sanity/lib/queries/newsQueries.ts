import { groq } from "next-sanity";

/**
 * Get all news articles with pagination
 */
export const getAllNewsQuery = groq`
  *[_type == "newsArticle"] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "author": author->{
      name,
      "avatar": avatar.asset->url
    },
    "category": category->{
      title,
      color
    },
    publishedDate,
    isFeatured,
    tags,
    language
  }
`;

/**
 * Get featured news articles for homepage
 */
export const getFeaturedNewsQuery = groq`
  *[_type == "newsArticle" && isFeatured == true] | order(publishedDate desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "author": author->{
      name,
      "avatar": avatar.asset->url
    },
    "category": category->{
      title,
      color
    },
    publishedDate,
    language
  }
`;

/**
 * Get news by category
 */
export const getNewsByCategoryQuery = groq`
  *[_type == "newsArticle" && category->slug.current == $categorySlug && language == $language] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "author": author->{
      name,
      "avatar": avatar.asset->url
    },
    "category": category->{
      title,
      color
    },
    publishedDate
  }
`;

/**
 * Get news by author
 */
export const getNewsByAuthorQuery = groq`
  *[_type == "newsArticle" && author->slug.current == $authorSlug && language == $language] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "author": author->{
      name,
      "avatar": avatar.asset->url
    },
    "category": category->{
      title,
      color
    },
    publishedDate
  }
`;

/**
 * Get single news article by slug
 */
export const getNewsBySlugQuery = groq`
  *[_type == "newsArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "author": author->{
      name,
      "avatar": avatar.asset->url,
      bio
    },
    "category": category->{
      title,
      slug,
      color
    },
    publishedDate,
    tags,
    language
  }
`;

/**
 * Search news articles
 */
export const searchNewsQuery = groq`
  *[_type == "newsArticle" && language == $language && (
    title match $searchTerm + "*" || 
    excerpt match $searchTerm + "*"
  )] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "author": author->{
      name,
      "avatar": avatar.asset->url
    },
    "category": category->{
      title,
      color
    },
    publishedDate
  }
`;

/**
 * Get total count of news articles
 */
export const getNewsCountQuery = groq`
  count(*[_type == "newsArticle" && language == $language])
`;

/**
 * Get news count by category
 */
export const getNewsCategoryCountQuery = groq`
  count(*[_type == "newsArticle" && category->slug.current == $categorySlug && language == $language])
`;
