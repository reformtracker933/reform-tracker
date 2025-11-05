import { groq } from "next-sanity";

/**
 * Get all resources with pagination
 */
export const getAllResourcesQuery = groq`
  *[_type == "resource" && language == $language] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    "file": file.asset->{
      url,
      originalFilename,
      size
    },
    fileSize,
    "category": category->{
      title,
      color
    },
    "commission": commission->{
      name
    },
    publishedDate,
    description,
    color,
    "thumbnail": thumbnail.asset->url
  }
`;

/**
 * Get resources by category
 */
export const getResourcesByCategoryQuery = groq`
  *[_type == "resource" && category->slug.current == $categorySlug && language == $language] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    "file": file.asset->{
      url,
      originalFilename,
      size
    },
    fileSize,
    "category": category->{
      title,
      color
    },
    "commission": commission->{
      name
    },
    publishedDate,
    description,
    color
  }
`;

/**
 * Get resources by commission
 */
export const getResourcesByCommissionQuery = groq`
  *[_type == "resource" && commission->slug.current == $commissionSlug && language == $language] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    "file": file.asset->{
      url,
      originalFilename,
      size
    },
    fileSize,
    "category": category->{
      title,
      color
    },
    "commission": commission->{
      name
    },
    publishedDate,
    description,
    color
  }
`;

/**
 * Search resources
 */
export const searchResourcesQuery = groq`
  *[_type == "resource" && language == $language && (
    title match $searchTerm + "*" || 
    description match $searchTerm + "*"
  )] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    "file": file.asset->{
      url,
      originalFilename,
      size
    },
    fileSize,
    "category": category->{
      title,
      color
    },
    "commission": commission->{
      name
    },
    publishedDate,
    description,
    color
  }
`;

/**
 * Get single resource by slug
 */
export const getResourceBySlugQuery = groq`
  *[_type == "resource" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "file": file.asset->{
      url,
      originalFilename,
      size
    },
    fileSize,
    "category": category->{
      title,
      slug,
      color
    },
    "commission": commission->{
      name,
      slug,
      fullName
    },
    publishedDate,
    description,
    color,
    "thumbnail": thumbnail.asset->url,
    language
  }
`;

/**
 * Get total count of resources
 */
export const getResourcesCountQuery = groq`
  count(*[_type == "resource" && language == $language])
`;
