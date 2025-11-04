# Sanity CMS Schema to Frontend Mapping

## Overview

This document explains how Sanity Studio schemas map to frontend pages, which admin sections control which content, and how data flows through the application.

---

## 📊 Schema Structure

### Base Schemas (Supporting Types)

These are foundational schemas referenced by content types:

1. **Block Content** (`blockContentType`)
   - Rich text editor configuration
   - Used for: Article body, descriptions, formatted content
   - Supports: Headings, lists, links, formatting

2. **Category** (`categoryType`)
   - Purpose: Categorize news, updates, proposals, and resources
   - Fields:
     - `title`: Category name (Bilingual)
     - `slug`: URL-friendly identifier
     - `description`: Category description (Bilingual)
     - `color`: Visual identifier color

3. **Author** (`authorType`)
   - Purpose: Author information for news articles
   - Fields:
     - `name`: Author name
     - `slug`: URL-friendly identifier
     - `avatar`: Profile image
     - `bio`: Author biography (Bilingual)
     - `email`: Contact email

4. **Commission** (`commissionType`)
   - Purpose: Reform commissions/organizations
   - Fields:
     - `name`: Commission name (Bilingual)
     - `slug`: URL-friendly identifier
     - `description`: Commission details (Bilingual)
     - `establishedDate`: Date of establishment
     - `website`: Official website URL

---

## 🎯 Content Schemas & Frontend Mapping

### 1. News Article (`newsArticleType`)

**Sanity Studio Section:** "সংস্কার সংবাদ / News Articles"

**Frontend Pages:**

- **Home Page** (`/`)
  - Featured news section (left column with large image)
  - Recent news cards (right column, 3 items)
- **News Page** (`/news`)
  - All news grid (6 per page)
  - Searchable and filterable

**Schema Fields:**

```typescript
{
  title: string (Bilingual)
  slug: string
  excerpt: string (Bilingual)
  body: BlockContent (Bilingual)
  featuredImage: Image
  featuredImageAlt: string
  author: Reference<Author>
  category: Reference<Category>
  publishedDate: DateTime
  isFeatured: boolean
  tags: string[]
}
```

**Data Flow:**

```
Sanity Studio → getFeaturedNews() → Home Page
Sanity Studio → getAllNews() → News Page
```

**Usage Example:**

- Admin creates a news article in Sanity
- Sets `isFeatured: true` to show on homepage
- Appears in featured section with large image
- Also appears in news grid

---

### 2. Reform Update (`reformUpdateType`)

**Sanity Studio Section:** "সংস্কার আপডেট / Reform Updates"

**Frontend Pages:**

- **Home Page** (`/`)
  - Reform updates section (4 button cards)
- **News Page** (`/news`)
  - Updates section at bottom (5 per page)
  - Searchable by category

**Schema Fields:**

```typescript
{
  title: string(Bilingual);
  slug: string;
  category: Reference<Category>;
  color: string;
  publishedDate: DateTime;
  description: string(Bilingual);
  relatedArticles: Reference < NewsArticle > [];
}
```

**Data Flow:**

```
Sanity Studio → getRecentUpdates(4) → Home Page
Sanity Studio → getAllUpdates() → News Page Updates
```

**Visual Representation:**

- Displayed as colored button cards
- Color is taken from category or custom color field
- Shows category badge and title

---

### 3. Political Party (`politicalPartyType`)

**Sanity Studio Section:** "রাজনৈতিক দলগুলো / Political Parties"

**Frontend Pages:**

- **Parties Page** (`/parties`)
  - Doughnut charts section (4 parties per view, paginated)
  - Bar chart comparison (6 parties)
  - Proposal table (shows party positions)

**Schema Fields:**

```typescript
{
  name: string;
  slug: string;
  logo: Image;
  description: string(Bilingual);
  foundedDate: DateTime;
  website: string;
  statistics: {
    totalStatements: number;
    approved: number;
    rejected: number;
    pending: number;
    completionPercentage: number;
    pendingPercentage: number;
  }
}
```

**Data Flow:**

```
Sanity Studio → getPartyStatistics() → Parties Page
```

**Visual Components:**

1. **Doughnut Charts**: Show completion vs pending statements
2. **Bar Chart**: Compare acceptable vs unacceptable across parties
3. **Statistics Cards**: Total statements and rejection count

---

### 4. Proposal (`proposalType`)

**Sanity Studio Section:** "প্রস্তাব / Proposals"

**Frontend Pages:**

- **Parties Page** (`/parties`)
  - Proposal table with party positions
  - Searchable and filterable

**Schema Fields:**

```typescript
{
  title: string (Bilingual)
  slug: string
  description: string (Bilingual)
  category: Reference<Category>
  commission: Reference<Commission>
  status: 'pending' | 'approved' | 'rejected'
  publishedDate: DateTime
  partyPositions: Array<{
    party: Reference<PoliticalParty>
    stance: 'support' | 'against' | 'neutral'
    statement: string (Bilingual)
  }>
}
```

**Data Flow:**

```
Sanity Studio → getAllProposals() → Parties Page Table
```

**Table Display:**

- Proposal Name
- Commission
- Category (with color badge)
- Party positions (Support/Against/-)
- Date

---

### 5. Resource (`resourceType`)

**Sanity Studio Section:** "সম্পদ / Resources"

**Frontend Pages:**

- **Asset Page** (`/asset`)
  - Table view with downloadable files
  - Searchable and filterable by category/date

**Schema Fields:**

```typescript
{
  title: string (Bilingual)
  slug: string
  description: string (Bilingual)
  category: Reference<Category>
  commission: Reference<Commission>
  file: {
    asset: File
    url: string
    size: number
    originalFilename: string
  }
  publishedDate: DateTime
  tags: string[]
}
```

**Data Flow:**

```
Sanity Studio → getAllResources() → Asset Page
```

**Table Display:**

- File Name
- Category Badge
- Published Date (in Bengali format)
- Commission
- File Size (in MB)
- Download Button

---

### 6. Dashboard Stats (`dashboardStatsType`)

**Sanity Studio Section:** "ড্যাশবোর্ড পরিসংখ্যান / Dashboard Statistics"

**Frontend Pages:**

- **Dashboard Page** (`/dashboard`)
  - Card statistics
  - Bar chart (Status breakdown)
  - Doughnut chart (Sector breakdown)

**Schema Fields:**

```typescript
{
  title: string
  totalProposals: number
  proposalsDelta: string (e.g., "+12%")
  totalCommissions: number
  commissionsDelta: string
  statusBreakdown: Array<{
    label_en: string
    label_bn: string
    count: number
  }>
  sectorBreakdown: Array<{
    sectorName_en: string
    sectorName_bn: string
    count: number
    color: string
  }>
  lastUpdated: DateTime
}
```

**Data Flow:**

```
Sanity Studio → getDashboardStats() → Dashboard Page
```

**Visual Components:**

1. **Total Proposal Card**: Shows count + delta
2. **Total Commission Card**: Shows count + delta
3. **Bar Chart**: Status breakdown (Running, Completed, Pre-planned, Expelled)
4. **Doughnut Chart**: Sector breakdown (Anti-Corruption, Reform by Sector, etc.)

---

### 7. Chart Config (`chartConfigType`)

**Sanity Studio Section:** "চার্ট কনফিগারেশন / Chart Configuration"

**Purpose:** Configure chart appearance and behavior

**Schema Fields:**

```typescript
{
  chartId: string
  chartType: 'bar' | 'line' | 'pie' | 'doughnut'
  title: string (Bilingual)
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor: string | string[]
    borderColor: string
  }>
  options: JSON
}
```

**Usage:**

- Provides flexible chart configuration
- Can be fetched by ID for specific charts
- Currently used for advanced chart customization

---

## 🔄 Data Flow Architecture

```
┌─────────────────┐
│  Sanity Studio  │ (Content Management)
│  (CMS Admin)    │
└────────┬────────┘
         │
         │ Publish Content
         ▼
┌─────────────────┐
│  Sanity CDN     │ (Content Delivery)
└────────┬────────┘
         │
         │ GROQ Queries
         ▼
┌─────────────────┐
│  fetch.ts       │ (Data Fetching Layer)
│  - getFeaturedNews()
│  - getAllNews()
│  - getRecentUpdates()
│  - getDashboardStats()
│  - getPartyStatistics()
│  - getAllProposals()
│  - getAllResources()
└────────┬────────┘
         │
         │ TypeScript Types
         ▼
┌─────────────────┐
│  Server Pages   │ (page.tsx - Server Components)
│  - Fetch data
│  - Pass as props
└────────┬────────┘
         │
         │ Props
         ▼
┌─────────────────┐
│ Client Comps    │ (*Client.tsx - Client Components)
│  - Use locale
│  - Handle state
│  - Display data
└─────────────────┘
```

---

## 📄 Page-by-Page Breakdown

### Home Page (`/`)

**Schemas Used:**

- ✅ News Article (featured + recent)
- ✅ Reform Update (recent 4)

**Sanity Sections:**

- "সংস্কার সংবাদ / News Articles" (set `isFeatured: true`)
- "সংস্কার আপডেট / Reform Updates"

---

### Dashboard Page (`/dashboard`)

**Schemas Used:**

- ✅ Dashboard Stats

**Sanity Sections:**

- "ড্যাশবোর্ড পরিসংখ্যান / Dashboard Statistics"

**Admin Actions:**

1. Update total proposals/commissions
2. Add/edit status breakdown data
3. Add/edit sector breakdown data
4. Charts auto-update on save

---

### Parties Page (`/parties`)

**Schemas Used:**

- ✅ Political Party
- ✅ Proposal
- ✅ Category (for proposals)
- ✅ Commission (for proposals)

**Sanity Sections:**

- "রাজনৈতিক দলগুলো / Political Parties"
- "প্রস্তাব / Proposals"

**Admin Actions:**

1. Create/edit political parties with statistics
2. Create proposals with party positions
3. Link proposals to categories and commissions
4. Party charts and table auto-update

---

### News Page (`/news`)

**Schemas Used:**

- ✅ News Article (all)
- ✅ Reform Update (all)
- ✅ Category (for filtering)
- ✅ Author (for filtering)

**Sanity Sections:**

- "সংস্কার সংবাদ / News Articles"
- "সংস্কার আপডেট / Reform Updates"

**Admin Actions:**

1. Publish news articles (visible in grid)
2. Publish reform updates (visible in updates section)
3. Assign categories and authors
4. Content is searchable and filterable

---

### Asset Page (`/asset`)

**Schemas Used:**

- ✅ Resource
- ✅ Category (for filtering)
- ✅ Commission (for metadata)

**Sanity Sections:**

- "সম্পদ / Resources"

**Admin Actions:**

1. Upload documents/files
2. Assign categories
3. Link to commissions
4. Files are downloadable from frontend

---

## 🌐 Bilingual Support

All content schemas support bilingual fields (Bengali/English):

**Implementation:**

```typescript
// In Schema
{
  name: 'title',
  title: 'শিরোনাম / Title',
  type: 'string',
}

// In Frontend
locale === 'bn' ? title_bn : title_en
```

**Bilingual Fields:**

- ✅ Titles
- ✅ Descriptions
- ✅ Excerpts
- ✅ Body content
- ✅ Category names
- ✅ Author bios
- ✅ Chart labels

---

## 🎨 Default/Fallback Data

When Sanity has no content, components show template data:

**Dashboard:**

- Empty charts with 0 values
- Labels from RTL.json translations
- Card stats show 0 with "+0%" delta

**Parties:**

- 4 default party doughnut charts (0 data)
- 6 default table rows
- 6 default bar chart parties

**News/Assets:**

- Empty states with proper messaging
- Filters still functional

---

## 🚀 Quick Admin Guide

### To Add Featured News to Homepage:

1. Go to "সংস্কার সংবাদ / News Articles"
2. Create new article
3. Toggle `isFeatured: true`
4. Add large featured image
5. Publish → Appears on homepage

### To Update Dashboard Stats:

1. Go to "ড্যাশবোর্ড পরিসংখ্যান / Dashboard Statistics"
2. Edit the single stats document
3. Update numbers in status/sector breakdowns
4. Save → Dashboard charts update instantly

### To Add Party Proposal Position:

1. Go to "প্রস্তাব / Proposals"
2. Create/edit proposal
3. Add party positions (Support/Against/Neutral)
4. Save → Appears in parties page table

### To Upload Downloadable Resource:

1. Go to "সম্পদ / Resources"
2. Create new resource
3. Upload file
4. Assign category and commission
5. Publish → File appears in asset page table

---

## 🔍 Content Relationships

```
NewsArticle
  ├── author → Author
  ├── category → Category
  └── tags

ReformUpdate
  ├── category → Category
  └── relatedArticles → NewsArticle[]

Proposal
  ├── category → Category
  ├── commission → Commission
  └── partyPositions → PoliticalParty[]

Resource
  ├── category → Category
  └── commission → Commission

DashboardStats
  ├── statusBreakdown (custom data)
  └── sectorBreakdown (custom data)
```

---

## 📝 Translation Keys

All UI text comes from `RTL.json`:

**Sections:**

- `heroSection`: Hero section text
- `reformNewsSection`: News section labels
- `reformUpdateSection`: Update section labels
- `dashboard`: Dashboard labels and titles
- `parties`: Parties page labels
- `reformNews`: News page labels
- `resource`: Asset page labels

**Translation System:**

```typescript
const { getTranslation } = useLocale();
const pageText = getTranslation('dashboard');

// Usage
{
  pageText.title;
} // Fully typed, auto-complete enabled
```

---

## 🎯 Summary

| Schema               | Admin Section         | Frontend Page  | Purpose                |
| -------------------- | --------------------- | -------------- | ---------------------- |
| `newsArticleType`    | সংস্কার সংবাদ         | Home, News     | News content           |
| `reformUpdateType`   | সংস্কার আপডেট         | Home, News     | Quick updates          |
| `politicalPartyType` | রাজনৈতিক দলগুলো       | Parties        | Party data & stats     |
| `proposalType`       | প্রস্তাব              | Parties        | Proposals & positions  |
| `resourceType`       | সম্পদ                 | Asset          | Downloadable files     |
| `dashboardStatsType` | ড্যাশবোর্ড পরিসংখ্যান | Dashboard      | Statistics & charts    |
| `categoryType`       | ক্যাটাগরি             | All pages      | Content categorization |
| `authorType`         | লেখক                  | News pages     | Author info            |
| `commissionType`     | কমিশন                 | Parties, Asset | Commission data        |
| `chartConfigType`    | চার্ট কনফিগারেশন      | Dashboard      | Chart settings         |

---

**Last Updated:** November 5, 2025
**Version:** 1.0
**Maintained by:** Reform Tracker Development Team
