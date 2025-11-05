/**
 * TypeScript types for Sanity content
 * Generated based on schema definitions
 */

// Base Types
export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  _type: "image";
}

export interface SanityFile {
  asset: {
    _ref: string;
    _type: "reference";
  };
  _type: "file";
}

export interface Slug {
  current: string;
  _type: "slug";
}

// Block Content Type (for rich text)
export type BlockContent = Array<{
  _type: "block";
  [key: string]: unknown;
}>;

// Category
export interface Category {
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
  color?: string;
  language: "en" | "bn";
  type: "news" | "update" | "proposal" | "resource" | "all";
}

// Author
export interface Author {
  _id: string;
  name: string;
  slug: Slug;
  avatar: string; // URL after resolution
  bio?: string;
  language: "en" | "bn";
}

// Commission
export interface Commission {
  _id: string;
  name: string;
  slug: Slug;
  fullName?: string;
  description?: string;
  establishedDate?: string;
  website?: string;
  language: "en" | "bn";
}

// News Article
export interface NewsArticle {
  _id: string;
  title: string;
  slug: Slug;
  excerpt: string;
  body: BlockContent;
  featuredImage: string; // URL after resolution
  featuredImageAlt: string;
  author: Author;
  category: Category;
  publishedDate: string;
  isFeatured: boolean;
  language: "en" | "bn";
  tags?: string[];
}

// Reform Update
export interface ReformUpdate {
  _id: string;
  title: string;
  slug: Slug;
  description?: string;
  category: Category;
  color: string;
  publishedDate: string;
  priority: number;
  language: "en" | "bn";
  relatedArticles?: NewsArticle[];
}

// Resource
export interface Resource {
  _id: string;
  title: string;
  slug: Slug;
  file: {
    url: string;
    originalFilename: string;
    size: number;
  };
  fileSize?: string;
  category: Category;
  commission: Commission;
  publishedDate: string;
  description?: string;
  color: string;
  language: "en" | "bn";
  thumbnail?: string;
}

// Political Party
export interface PoliticalParty {
  _id: string;
  name: string;
  slug: Slug;
  fullName?: string;
  logo?: string;
  color: string;
  description?: string;
  established?: string;
  statistics: {
    totalStatements: number;
    approved: number;
    rejected: number;
    completionPercentage: number;
    pendingPercentage: number;
  };
  annualData?: Array<{
    year: string;
    acceptable: number;
    unacceptable: number;
  }>;
  displayOrder: number;
}

// Proposal
export interface PartyPosition {
  party: PoliticalParty;
  stance: "support" | "against" | "neutral";
  votingDate?: string;
}

export interface Proposal {
  _id: string;
  title: string;
  slug: Slug;
  description?: BlockContent;
  commission: Commission;
  category: Category;
  color: string;
  publishedDate: string;
  status: "running" | "completed" | "preplanned" | "expelled";
  partyPositions?: PartyPosition[];
  language: "en" | "bn";
}

// Dashboard Statistics
export interface StatusBreakdown {
  status: "running" | "completed" | "preplanned" | "expelled";
  count: number;
  label_en: string;
  label_bn: string;
}

export interface SectorBreakdown {
  sectorName_en: string;
  sectorName_bn: string;
  value: number;
  color: string;
}

export interface DashboardStats {
  _id: string;
  totalProposals: number;
  totalCommissions: number;
  proposalsDelta: string;
  commissionsDelta: string;
  statusBreakdown: StatusBreakdown[];
  sectorBreakdown: SectorBreakdown[];
  lastUpdated: string;
  isActive: boolean;
}

// Chart Configuration
export interface ChartConfig {
  _id: string;
  name: string;
  chartType: "bar" | "doughnut" | "line";
  chartId: string;
  colorScheme: string[];
  labels: {
    title_en?: string;
    title_bn?: string;
    subtitle_en?: string;
    subtitle_bn?: string;
  };
  options: {
    showLegend?: boolean;
    showTooltip?: boolean;
    cutoutPercentage?: number;
    barBorderRadius?: number;
  };
  isActive: boolean;
}

// Query Parameters
export interface PaginationParams {
  start: number;
  end: number;
}

export interface LanguageParam {
  language: "en" | "bn";
}

export interface SearchParams extends PaginationParams, LanguageParam {
  searchTerm: string;
}

export interface CategoryFilterParams extends PaginationParams, LanguageParam {
  categorySlug: string;
}

export interface DateRangeParams {
  yearStart: string;
  yearEnd: string;
}
