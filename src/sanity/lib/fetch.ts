import { client } from "./client";
import {
  getFeaturedNewsQuery,
  getAllNewsQuery,
  getNewsBySlugQuery,
} from "./queries/newsQueries";
import {
  getRecentUpdatesQuery,
  getAllUpdatesQuery,
} from "./queries/updateQueries";
import {
  getDashboardStatsQuery,
  getChartConfigQuery,
} from "./queries/dashboardQueries";
import {
  getAllPartiesQuery,
  getPartyStatisticsQuery,
  getPartyBySlugQuery,
} from "./queries/partyQueries";
import {
  getAllProposalsQuery,
  getProposalsByStatusQuery,
  getProposalBySlugQuery,
} from "./queries/proposalQueries";
import { getAllResourcesQuery } from "./queries/resourceQueries";
import {
  NewsArticle,
  ReformUpdate,
  DashboardStats,
  PoliticalParty,
  Proposal,
  Resource,
} from "@/types/sanity";

/**
 * NEWS ARTICLE FETCHERS
 */

export async function getFeaturedNews(
  language: "en" | "bn" = "bn",
): Promise<NewsArticle[]> {
  try {
    const news = await client.fetch(getFeaturedNewsQuery, { language });
    return news || [];
  } catch (error) {
    console.error("Error fetching featured news:", error);
    return [];
  }
}

export async function getAllNews(
  language: "en" | "bn" = "bn",
  start: number = 0,
  end: number = 10,
): Promise<NewsArticle[]> {
  try {
    const news = await client.fetch(getAllNewsQuery, { language, start, end });
    return news || [];
  } catch (error) {
    console.error("Error fetching all news:", error);
    return [];
  }
}

export async function getNewsBySlug(
  slug: string,
  language: "en" | "bn" = "bn",
): Promise<NewsArticle | null> {
  try {
    const news = await client.fetch(getNewsBySlugQuery, { slug, language });
    return news || null;
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    return null;
  }
}

/**
 * REFORM UPDATE FETCHERS
 */

export async function getRecentUpdates(
  language: "en" | "bn" = "bn",
  limit: number = 4,
): Promise<ReformUpdate[]> {
  try {
    const updates = await client.fetch(getRecentUpdatesQuery, { language });
    return updates?.slice(0, limit) || [];
  } catch (error) {
    console.error("Error fetching recent updates:", error);
    return [];
  }
}

export async function getAllUpdates(
  language: "en" | "bn" = "bn",
  start: number = 0,
  end: number = 10,
): Promise<ReformUpdate[]> {
  try {
    const updates = await client.fetch(getAllUpdatesQuery, {
      language,
      start,
      end,
    });
    return updates || [];
  } catch (error) {
    console.error("Error fetching all updates:", error);
    return [];
  }
}

/**
 * DASHBOARD FETCHERS
 */

export async function getDashboardStats(): Promise<DashboardStats | null> {
  try {
    const stats = await client.fetch(getDashboardStatsQuery);
    return stats || null;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return null;
  }
}

export async function getChartConfig(chartId: string) {
  try {
    const config = await client.fetch(getChartConfigQuery, { chartId });
    return config || null;
  } catch (error) {
    console.error("Error fetching chart config:", error);
    return null;
  }
}

/**
 * POLITICAL PARTY FETCHERS
 */

export async function getAllParties(): Promise<PoliticalParty[]> {
  try {
    const parties = await client.fetch(getAllPartiesQuery);
    return parties || [];
  } catch (error) {
    console.error("Error fetching all parties:", error);
    return [];
  }
}

export async function getPartyStatistics(): Promise<PoliticalParty[]> {
  try {
    const parties = await client.fetch(getPartyStatisticsQuery);
    return parties || [];
  } catch (error) {
    console.error("Error fetching party statistics:", error);
    return [];
  }
}

export async function getPartyBySlug(
  slug: string,
): Promise<PoliticalParty | null> {
  try {
    const party = await client.fetch(getPartyBySlugQuery, { slug });
    return party || null;
  } catch (error) {
    console.error("Error fetching party by slug:", error);
    return null;
  }
}

/**
 * PROPOSAL FETCHERS
 */

export async function getAllProposals(
  language: "en" | "bn" = "bn",
  start: number = 0,
  end: number = 10,
): Promise<Proposal[]> {
  try {
    const proposals = await client.fetch(getAllProposalsQuery, {
      language,
      start,
      end,
    });
    return proposals || [];
  } catch (error) {
    console.error("Error fetching all proposals:", error);
    return [];
  }
}

export async function getProposalsByStatus(
  status: string,
  language: "en" | "bn" = "bn",
  start: number = 0,
  end: number = 10,
): Promise<Proposal[]> {
  try {
    const proposals = await client.fetch(getProposalsByStatusQuery, {
      status,
      language,
      start,
      end,
    });
    return proposals || [];
  } catch (error) {
    console.error("Error fetching proposals by status:", error);
    return [];
  }
}

export async function getProposalBySlug(
  slug: string,
  language: "en" | "bn" = "bn",
): Promise<Proposal | null> {
  try {
    const proposal = await client.fetch(getProposalBySlugQuery, {
      slug,
      language,
    });
    return proposal || null;
  } catch (error) {
    console.error("Error fetching proposal by slug:", error);
    return null;
  }
}

/**
 * RESOURCE FETCHERS
 */

export async function getAllResources(
  language: "en" | "bn" = "bn",
  start: number = 0,
  end: number = 100,
): Promise<Resource[]> {
  try {
    const resources = await client.fetch(getAllResourcesQuery, {
      language,
      start,
      end,
    });
    return resources || [];
  } catch (error) {
    console.error("Error fetching all resources:", error);
    return [];
  }
}
