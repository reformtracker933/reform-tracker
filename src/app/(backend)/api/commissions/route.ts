import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import type { CommissionParty, Theme } from '@/types/sanity';

// API Response Types
interface ThemeWithParties extends Theme {
  parties: CommissionParty[];
}

interface ProcessedReport {
  _id: string;
  title: string;
  slug: { current: string };
  featuredImage?: string;
  featuredImageAlt?: string;
  excerpt: string;
  publishedDate: string;
  tags: string[];
  themes: ThemeWithParties[];
}

interface RawThemeGroup {
  theme: Theme | null;
  parties: (CommissionParty | null)[];
}

interface RawReport {
  _id: string;
  title: string;
  slug: { current: string };
  featuredImage?: string;
  featuredImageAlt?: string;
  excerpt: string;
  publishedDate: string;
  tags: string[];
  themes: RawThemeGroup[];
}

// Validation constants
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 12;
const MAX_SEARCH_LENGTH = 200;

/**
 * Safely parses and validates pagination parameters
 */
function parsePaginationParams(searchParams: URLSearchParams): {
  page: number;
  limit: number;
  offset: number;
} {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(
      1,
      parseInt(searchParams.get('limit') || String(DEFAULT_LIMIT), 10) ||
        DEFAULT_LIMIT
    )
  );
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

/**
 * Sanitizes search input to prevent injection attacks
 */
function sanitizeSearchInput(input: string): string {
  return input
    .slice(0, MAX_SEARCH_LENGTH)
    .replace(/[\\"]/g, '') // Remove backslashes and quotes
    .trim();
}

/**
 * Deduplicates parties by _id using Map for O(n) performance
 */
function deduplicateParties(
  parties: (CommissionParty | null)[]
): CommissionParty[] {
  const validParties = parties.filter(
    (party): party is CommissionParty =>
      party !== null && party !== undefined && typeof party._id === 'string'
  );

  return Array.from(
    new Map(validParties.map((party) => [party._id, party])).values()
  );
}

/**
 * Processes raw report data to flatten themes and deduplicate parties
 */
function processReport(report: RawReport): ProcessedReport {
  const themes = (report.themes || [])
    .filter(
      (themeGroup): themeGroup is Required<RawThemeGroup> & { theme: Theme } =>
        themeGroup !== null &&
        themeGroup.theme !== null &&
        typeof themeGroup.theme._id === 'string'
    )
    .map(
      (themeGroup): ThemeWithParties => ({
        ...themeGroup.theme,
        parties: deduplicateParties(themeGroup.parties || []),
      })
    );

  return {
    ...report,
    themes,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { page, limit, offset } = parsePaginationParams(searchParams);

    // Extract and validate filter parameters
    const rawSearch = searchParams.get('search') || '';
    const search = rawSearch ? sanitizeSearchInput(rawSearch) : '';
    const themeIds =
      searchParams
        .get('themes')
        ?.split(',')
        .filter((id) => id.trim().length > 0) || [];
    const partyIds =
      searchParams
        .get('parties')
        ?.split(',')
        .filter((id) => id.trim().length > 0) || [];

    // Build filter conditions with parameterized approach
    const filterConditions: string[] = [
      '_type == "commissionReport"',
      'status == "published"',
    ];

    // Search condition - optimized for performance
    if (search) {
      const searchLower = search.toLowerCase();
      filterConditions.push(`(
        lower(title) match "*${searchLower}*" ||
        lower(excerpt) match "*${searchLower}*"
      )`);
    }

    // Theme filter - using array containment for better performance
    if (themeIds.length > 0) {
      const themeFilter = themeIds
        .map((id) => `themes[].theme._ref == "${id.replace(/"/g, '')}"`) // Sanitize IDs
        .join(' || ');
      filterConditions.push(`(${themeFilter})`);
    }

    // Party filter - optimized query structure
    if (partyIds.length > 0) {
      const partyFilter = partyIds
        .map(
          (id) =>
            `themes[].sections[].politicalParties[]._ref == "${id.replace(/"/g, '')}"`
        ) // Sanitize IDs
        .join(' || ');
      filterConditions.push(`(${partyFilter})`);
    }

    const filter = filterConditions.join(' && ');

    // Optimized query for reports with selective field projection
    const reportsQuery = groq`
      *[${filter}] | order(publishedDate desc, _createdAt desc) [${offset}...${offset + limit}] {
        _id,
        title,
        slug,
        "featuredImage": featuredImage.asset->url,
        "featuredImageAlt": featuredImage.alt,
        excerpt,
        publishedDate,
        tags,
        "themes": themes[defined(@) && defined(theme)] {
          "theme": theme[defined(@)]->{
            _id,
            name,
            slug,
            color,
            icon
          },
          "parties": array::unique(
            sections[defined(@)].politicalParties[defined(@)]->[
              defined(_id) && 
              defined(name) && 
              defined(color)
            ]{
              _id,
              name,
              color
            }
          )
        }
      }
    `;

    // Optimized count query with same filter
    const countQuery = groq`count(*[${filter}])`;

    // Execute queries in parallel for better performance
    const [reports, total] = await Promise.all([
      client.fetch<RawReport[]>(reportsQuery),
      client.fetch<number>(countQuery),
    ]);

    // Process reports using optimized helper function
    const processedReports = reports.map(processReport);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        success: true,
        data: processedReports,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
        meta: {
          count: processedReports.length,
          filters: {
            search: search || undefined,
            themes: themeIds.length > 0 ? themeIds : undefined,
            parties: partyIds.length > 0 ? partyIds : undefined,
          },
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('[API Error] Commission reports fetch failed:', error);

    // Determine appropriate error status
    const isClientError =
      error instanceof Error &&
      (error.message.includes('invalid') ||
        error.message.includes('validation'));

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch commission reports',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        ...(process.env.NODE_ENV === 'development' && {
          stack: error instanceof Error ? error.stack : undefined,
        }),
      },
      { status: isClientError ? 400 : 500 }
    );
  }
}
