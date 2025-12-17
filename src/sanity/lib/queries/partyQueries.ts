import { groq } from 'next-sanity';

/**
 * Get all political parties
 */
export const getAllPartiesQuery = groq`
  *[_type == "politicalParty"] | order(name asc) {
    _id,
    name,
    fullName,
    "logo": logo.asset->url,
    color,
    description
  }
`;

/**
 * Get party statistics for doughnut charts
 * TODO: Statistics removed from schema - implement when data source is available
 */
export const getPartyStatisticsQuery = groq`
  *[_type == "politicalParty"] | order(name asc) {
    _id,
    name,
    "logo": logo.asset->url,
    color
  }
`;

/**
 * Get single party by slug
 * Note: Slug field removed from simplified schema
 */
export const getPartyBySlugQuery = groq`
  *[_type == "politicalParty" && _id == $id][0] {
    _id,
    name,
    fullName,
    "logo": logo.asset->url,
    color,
    description
  }
`;

/**
 * Get party annual comparison data
 * TODO: Annual data removed from schema - implement when data source is available
 */
export const getPartyAnnualDataQuery = groq`
  *[_type == "politicalParty"] | order(name asc) {
    _id,
    name,
    color
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
