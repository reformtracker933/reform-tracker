import { groq } from "next-sanity";

/**
 * Get all political parties
 */
export const getAllPartiesQuery = groq`
  *[_type == "politicalParty"] | order(displayOrder asc) {
    _id,
    name,
    slug,
    fullName,
    "logo": logo.asset->url,
    color,
    description,
    established,
    statistics,
    annualData,
    displayOrder
  }
`;

/**
 * Get party statistics for doughnut charts
 */
export const getPartyStatisticsQuery = groq`
  *[_type == "politicalParty"] | order(displayOrder asc) {
    _id,
    name,
    "logo": logo.asset->url,
    color,
    statistics {
      totalStatements,
      approved,
      rejected,
      completionPercentage,
      pendingPercentage
    }
  }
`;

/**
 * Get single party by slug
 */
export const getPartyBySlugQuery = groq`
  *[_type == "politicalParty" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    fullName,
    "logo": logo.asset->url,
    color,
    description,
    established,
    statistics,
    annualData
  }
`;

/**
 * Get party annual comparison data
 * This fetches party data for bar chart
 */
export const getPartyAnnualDataQuery = groq`
  *[_type == "politicalParty"] | order(displayOrder asc) {
    _id,
    name,
    color,
    annualData[] {
      year,
      acceptable,
      unacceptable
    }
  }
`;

/**
 * Get proposals by party for computed statistics
 * Use this to calculate real-time statistics from proposals
 */
export const getProposalsByPartyQuery = groq`
  *[_type == "proposal" && $partyId in partyPositions[].party._ref] {
    _id,
    title,
    status,
    publishedDate,
    partyPositions[] {
      "party": party->{
        _id,
        name
      },
      stance,
      votingDate
    }
  }
`;

/**
 * Get annual party statistics computed from proposals
 * This replaces the need for annualStatistics schema
 */
export const getComputedAnnualStatsQuery = groq`
  *[_type == "proposal" && publishedDate >= $yearStart && publishedDate <= $yearEnd] {
    _id,
    title,
    status,
    publishedDate,
    partyPositions[] {
      "partyId": party->_id,
      "partyName": party->name,
      "partyColor": party->color,
      stance
    }
  }
`;
