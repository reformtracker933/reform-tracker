import { type SchemaTypeDefinition } from 'sanity';

// Base types
import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { authorType } from './authorType';
import { commissionType } from './commissionType';
import { subscriberType } from './subscriberType';

// Content types
import { newsArticleType } from './newsArticleType';
import { reformUpdateType } from './reformUpdateType';
import { resourceType } from './resourceType';
import { proposalType } from './proposalType';
import { politicalPartyType } from './politicalPartyType';

// Statistics & Chart types
import { dashboardStatsType } from './dashboardStatsType';
import { chartConfigType } from './chartConfigType';

// Commission Report types
import { themeType } from './themeType';
import { commissionReportType } from './commissionReportType';
import { commissionPartyType } from './commissionPartyType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Base types
    blockContentType,
    categoryType,
    authorType,
    commissionType,
    subscriberType,

    // Content types
    newsArticleType,
    reformUpdateType,
    resourceType,
    proposalType,
    politicalPartyType,

    // Statistics & Charts
    dashboardStatsType,
    chartConfigType,

    // Commission Reports
    themeType,
    commissionReportType,
    commissionPartyType,
  ],
};
