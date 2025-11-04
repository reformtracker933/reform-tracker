import { groq } from "next-sanity";

/**
 * Get active dashboard statistics
 */
export const getDashboardStatsQuery = groq`
  *[_type == "dashboardStats" && isActive == true][0] {
    _id,
    totalProposals,
    totalCommissions,
    proposalsDelta,
    commissionsDelta,
    statusBreakdown[] {
      status,
      count,
      label_en,
      label_bn
    },
    sectorBreakdown[] {
      sectorName_en,
      sectorName_bn,
      value,
      color
    },
    lastUpdated
  }
`;

/**
 * Get chart configuration by ID
 */
export const getChartConfigQuery = groq`
  *[_type == "chartConfig" && chartId == $chartId && isActive == true][0] {
    _id,
    name,
    chartType,
    chartId,
    colorScheme,
    labels {
      title_en,
      title_bn,
      subtitle_en,
      subtitle_bn
    },
    options {
      showLegend,
      showTooltip,
      cutoutPercentage,
      barBorderRadius
    }
  }
`;

/**
 * Get all active chart configurations
 */
export const getAllChartConfigsQuery = groq`
  *[_type == "chartConfig" && isActive == true] {
    _id,
    name,
    chartType,
    chartId,
    colorScheme,
    labels,
    options
  }
`;
