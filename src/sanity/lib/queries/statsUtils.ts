/**
 * Utility functions to compute statistics from proposals
 * These replace the need for manual annualStatistics schema
 */

interface PartyPosition {
  partyId: string;
  partyName: string;
  partyColor: string;
  stance: "support" | "against" | "neutral";
}

interface Proposal {
  _id: string;
  title: string;
  status: string;
  publishedDate: string;
  partyPositions: PartyPosition[];
}

export interface PartyAnnualStats {
  partyId: string;
  partyName: string;
  partyColor: string;
  acceptable: number;
  unacceptable: number;
  neutral: number;
}

/**
 * Calculate annual party statistics from proposals
 * Used for bar chart data on parties page
 */
export function calculateAnnualPartyStats(
  proposals: Proposal[],
): PartyAnnualStats[] {
  const partyStats: Record<string, PartyAnnualStats> = {};

  proposals.forEach((proposal) => {
    proposal.partyPositions?.forEach((position) => {
      const { partyId, partyName, partyColor, stance } = position;

      if (!partyStats[partyId]) {
        partyStats[partyId] = {
          partyId,
          partyName,
          partyColor,
          acceptable: 0,
          unacceptable: 0,
          neutral: 0,
        };
      }

      if (stance === "support") {
        partyStats[partyId].acceptable++;
      } else if (stance === "against") {
        partyStats[partyId].unacceptable++;
      } else {
        partyStats[partyId].neutral++;
      }
    });
  });

  return Object.values(partyStats);
}

/**
 * Format party stats for Chart.js bar chart
 */
export function formatPartyStatsForBarChart(stats: PartyAnnualStats[]) {
  return {
    labels: stats.map((s) => s.partyName),
    datasets: [
      {
        label: "Acceptable",
        data: stats.map((s) => s.acceptable),
        backgroundColor: "#4a7ec9",
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
      {
        label: "Unacceptable",
        data: stats.map((s) => s.unacceptable),
        backgroundColor: "#e83231",
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
    ],
  };
}

/**
 * Calculate party statistics for a specific party
 * Used for doughnut chart on parties page
 */
export function calculatePartyStatistics(
  proposals: Proposal[],
  partyId: string,
) {
  let approved = 0;
  let rejected = 0;
  let neutral = 0;

  proposals.forEach((proposal) => {
    const position = proposal.partyPositions?.find(
      (p) => p.partyId === partyId,
    );
    if (position) {
      if (position.stance === "support") approved++;
      else if (position.stance === "against") rejected++;
      else neutral++;
    }
  });

  const total = approved + rejected + neutral;

  return {
    totalStatements: total,
    approved,
    rejected,
    neutral,
    completionPercentage: total > 0 ? Math.round((approved / total) * 100) : 0,
    pendingPercentage:
      total > 0 ? Math.round(((rejected + neutral) / total) * 100) : 0,
  };
}

/**
 * Get date range for a year string
 */
export function getYearDateRange(yearString: string): {
  start: string;
  end: string;
} {
  // Handle formats like "2024-2025" or "2024"
  const years = yearString.split("-");
  const startYear = years[0];
  const endYear = years.length > 1 ? years[1] : years[0];

  return {
    start: `${startYear}-01-01T00:00:00Z`,
    end: `${endYear}-12-31T23:59:59Z`,
  };
}
