import { groq } from "next-sanity";

/**
 * Get all proposals with pagination
 */
export const getAllProposalsQuery = groq`
  *[_type == "proposal" && language == $language] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    "commission": commission->{
      name
    },
    "category": category->{
      title,
      color
    },
    color,
    publishedDate,
    status,
    partyPositions[] {
      "party": party->{
        _id,
        name,
        color
      },
      stance,
      votingDate
    }
  }
`;

/**
 * Get proposals by status (for dashboard bar chart)
 */
export const getProposalsByStatusQuery = groq`
  *[_type == "proposal" && language == $language && status == $status] | order(publishedDate desc) {
    _id,
    title,
    slug,
    status,
    publishedDate,
    "commission": commission->name,
    "category": category->title
  }
`;

/**
 * Get proposal with full party voting data
 */
export const getProposalBySlugQuery = groq`
  *[_type == "proposal" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "commission": commission->{
      name,
      fullName,
      slug
    },
    "category": category->{
      title,
      slug,
      color
    },
    color,
    publishedDate,
    status,
    partyPositions[] {
      "party": party->{
        _id,
        name,
        slug,
        fullName,
        "logo": logo.asset->url,
        color
      },
      stance,
      votingDate
    },
    language
  }
`;

/**
 * Get proposals by commission
 */
export const getProposalsByCommissionQuery = groq`
  *[_type == "proposal" && commission->slug.current == $commissionSlug && language == $language] | order(publishedDate desc) {
    _id,
    title,
    slug,
    "commission": commission->name,
    "category": category->{
      title,
      color
    },
    status,
    publishedDate
  }
`;

/**
 * Get proposals by category
 */
export const getProposalsByCategoryQuery = groq`
  *[_type == "proposal" && category->slug.current == $categorySlug && language == $language] | order(publishedDate desc) {
    _id,
    title,
    slug,
    "commission": commission->name,
    "category": category->title,
    status,
    publishedDate
  }
`;

/**
 * Search proposals
 */
export const searchProposalsQuery = groq`
  *[_type == "proposal" && language == $language && title match $searchTerm + "*"] | order(publishedDate desc) [$start...$end] {
    _id,
    title,
    slug,
    "commission": commission->name,
    "category": category->{
      title,
      color
    },
    status,
    publishedDate
  }
`;

/**
 * Get proposal count by status
 */
export const getProposalCountByStatusQuery = groq`
  {
    "running": count(*[_type == "proposal" && status == "running" && language == $language]),
    "completed": count(*[_type == "proposal" && status == "completed" && language == $language]),
    "preplanned": count(*[_type == "proposal" && status == "preplanned" && language == $language]),
    "expelled": count(*[_type == "proposal" && status == "expelled" && language == $language])
  }
`;

/**
 * Get total count of proposals
 */
export const getProposalsCountQuery = groq`
  count(*[_type == "proposal" && language == $language])
`;
