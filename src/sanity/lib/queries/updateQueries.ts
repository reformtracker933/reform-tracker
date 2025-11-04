import { groq } from "next-sanity";

/**
 * Get all reform updates with pagination
 */
export const getAllUpdatesQuery = groq`
  *[_type == "reformUpdate" && language == $language] | order(priority desc, publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    description,
    "category": category->{
      title,
      color
    },
    color,
    publishedDate,
    priority
  }
`;

/**
 * Get recent updates for homepage (top 4 by priority)
 */
export const getRecentUpdatesQuery = groq`
  *[_type == "reformUpdate" && language == $language] | order(priority desc, publishedDate desc) [0...4] {
    _id,
    title,
    slug,
    description,
    "category": category->{
      title,
      color
    },
    color,
    publishedDate,
    priority
  }
`;

/**
 * Get updates by category
 */
export const getUpdatesByCategoryQuery = groq`
  *[_type == "reformUpdate" && category->slug.current == $categorySlug && language == $language] | order(priority desc, publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    description,
    "category": category->{
      title,
      color
    },
    color,
    publishedDate,
    priority
  }
`;

/**
 * Get single update by slug with related articles
 */
export const getUpdateBySlugQuery = groq`
  *[_type == "reformUpdate" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "category": category->{
      title,
      slug,
      color
    },
    color,
    publishedDate,
    priority,
    "relatedArticles": relatedArticles[]->{
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url
    }
  }
`;

/**
 * Search updates
 */
export const searchUpdatesQuery = groq`
  *[_type == "reformUpdate" && language == $language && title match $searchTerm + "*"] | order(priority desc, publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    description,
    "category": category->{
      title,
      color
    },
    color,
    publishedDate,
    priority
  }
`;

/**
 * Get total count of updates
 */
export const getUpdatesCountQuery = groq`
  count(*[_type == "reformUpdate" && language == $language])
`;
