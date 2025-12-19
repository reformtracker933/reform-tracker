import { groq } from 'next-sanity';

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

export const getFeaturedCommissionReportsQuery = groq`
  *[_type == "commissionReport" && status == "published" && isFeatured == true] | order(publishedDate desc) [0...8] {
    _id,
    title,
    slug,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    excerpt,
    "allParties": array::unique(themes[].sections[].politicalParties[defined(@)]->{ 
      _id,
      name,
      fullName,
      "logo": logo.asset->url,
      color
    }[defined(_id)]),
    "themeList": themes[].theme->{
      _id,
      name,
      color,
      icon
    }[defined(_id)],
    publishedDate,
    isFeatured
  }
`;

export const getAllCommissionReportsQuery = groq`
  *[_type == "commissionReport" && status == "published"] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    excerpt,
    "allParties": array::unique(themes[].sections[].politicalParties[defined(@)]->{ 
      _id,
      name,
      fullName,
      "logo": logo.asset->url,
      color
    }[defined(_id)]),
    "themeList": themes[].theme->{
      _id,
      name,
      color,
      icon
    }[defined(_id)],
    publishedDate,
    isFeatured
  }
`;

export const getCommissionReportBySlugQuery = groq`
  *[_type == "commissionReport" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    excerpt,
    publishedDate,
    tags,
    themes[] {
      "theme": theme->{
        _id,
        name,
        slug,
        description,
        color,
        icon
      },
      sections[] {
        title,
        content,
        order,
        "politicalParties": politicalParties[]-> {
          _id,
          name,
          fullName,
          "logo": logo.asset->url,
          color,
          description
        }
      }
    }
  }
`;

export const searchCommissionReportsQuery = groq`
  *[
    _type == "commissionReport" && 
    status == "published" &&
    (
      title match $query ||
      excerpt match $query ||
      themes[].theme->name match $query ||
      themes[].sections[].title match $query ||
      pt::text(themes[].sections[].content) match $query ||
      tags[] match $query ||
      themes[].sections[].politicalParties[]->name match $query ||
      themes[].sections[].politicalParties[]->fullName match $query
    )
  ] | order(_score desc, publishedDate desc) {
    _id,
    title,
    slug,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    excerpt,
    "allParties": array::unique(themes[].sections[].politicalParties[defined(@)]->{ 
      _id,
      name,
      fullName,
      "logo": logo.asset->url,
      color
    }[defined(_id)]),
    "themeList": themes[].theme->{
      _id,
      name,
      color,
      icon
    }[defined(_id)],
    publishedDate,
    isFeatured,
    _score
  }
`;

export const getAllThemesQuery = groq`
  *[_type == "theme"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    color,
    icon
  }
`;

export const getCommissionReportCountQuery = groq`
  count(*[_type == "commissionReport" && status == "published"])
`;
