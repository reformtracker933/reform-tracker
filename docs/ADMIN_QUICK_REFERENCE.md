# Admin Quick Reference Guide

## 🚀 Quick Actions

### Add Content to Homepage

#### Featured News (Large Image Section)

```
1. Navigate to: "সংস্কার সংবাদ / News Articles"
2. Click: "+ Create"
3. Fill in:
   - Title (Bengali & English)
   - Upload large featured image (recommended: 1200x700px)
   - Write excerpt and full body
   - Select author and category
4. Toggle: "Is Featured" → ON
5. Publish
```

#### Recent News Cards (Right Side)

```
Same as above, but "Is Featured" → OFF
Shows 3 most recent non-featured articles
```

#### Reform Update Buttons

```
1. Navigate to: "সংস্কার আপডেট / Reform Updates"
2. Click: "+ Create"
3. Fill in:
   - Title (Bengali & English)
   - Select category (color will be applied)
   - Optionally set custom color
4. Publish
Shows 4 most recent updates
```

---

### Update Dashboard

#### Card Statistics

```
1. Navigate to: "ড্যাশবোর্ড পরিসংখ্যান / Dashboard Statistics"
2. Edit the single document
3. Update:
   - Total Proposals → Number
   - Proposals Delta → "+XX%" or "-XX%"
   - Total Commissions → Number
   - Commissions Delta → "+XX%" or "-XX%"
4. Save
```

#### Bar Chart (Status Breakdown)

```
In the same document:
1. Find "Status Breakdown" array
2. Edit each item:
   - Label (English) → "Running", "Completed", etc.
   - Label (Bengali) → "চলমান", "সম্পন্ন", etc.
   - Count → Number
3. Add/remove items as needed
4. Save
```

#### Doughnut Chart (Sector Breakdown)

```
In the same document:
1. Find "Sector Breakdown" array
2. Edit each item:
   - Sector Name (English)
   - Sector Name (Bengali)
   - Count → Number
   - Color → Hex code
3. Add/remove sectors
4. Save
```

---

### Manage Parties Page

#### Add Political Party

```
1. Navigate to: "রাজনৈতিক দলগুলো / Political Parties"
2. Click: "+ Create"
3. Fill in:
   - Name
   - Upload logo
   - Description (Bengali & English)
   - Website URL
4. Statistics section:
   - Total Statements → Number
   - Approved → Number
   - Rejected → Number
   - Pending → Number
   - Completion % → Number (0-100)
   - Pending % → Number (0-100)
5. Publish
```

#### Add Proposal with Party Positions

```
1. Navigate to: "প্রস্তাব / Proposals"
2. Click: "+ Create"
3. Fill in:
   - Title (Bengali & English)
   - Description
   - Select category
   - Select commission
   - Status: Pending/Approved/Rejected
4. Party Positions section:
   - Click "Add item"
   - Select party
   - Choose stance: Support/Against/Neutral
   - Write statement (optional)
   - Repeat for each party
5. Publish
```

---

### Manage News Page

#### Publish News Article

```
1. Navigate to: "সংস্কার সংবাদ / News Articles"
2. Create article (same as homepage featured news)
3. "Is Featured" → OFF (for news page only)
4. All published articles appear in news page grid
5. Searchable by title/content
6. Filterable by category, author, date
```

#### Publish Reform Update

```
1. Navigate to: "সংস্কার আপডেট / Reform Updates"
2. Create update
3. Appears in news page updates section (bottom)
4. Shows 5 per page with pagination
```

---

### Manage Asset Page

#### Upload Downloadable Resource

```
1. Navigate to: "সম্পদ / Resources"
2. Click: "+ Create"
3. Fill in:
   - Title (Bengali & English)
   - Description
   - Select category
   - Select commission (optional)
4. Upload file:
   - Click "Upload"
   - Select file (PDF, DOC, etc.)
   - Wait for upload to complete
5. Add tags (optional)
6. Publish
```

---

## 🔧 Supporting Content

### Add Category

```
1. Navigate to: "ক্যাটাগরি / Category"
2. Click: "+ Create"
3. Fill in:
   - Title (used for all content types)
   - Generate slug automatically
   - Description (Bengali & English)
   - Color → Hex code (for visual identification)
4. Publish
Used in: News, Updates, Proposals, Resources
```

### Add Author

```
1. Navigate to: "লেখক / Author"
2. Click: "+ Create"
3. Fill in:
   - Name
   - Generate slug
   - Upload avatar/photo
   - Bio (Bengali & English)
   - Email
4. Publish
Used in: News Articles
```

### Add Commission

```
1. Navigate to: "কমিশন / Commission"
2. Click: "+ Create"
3. Fill in:
   - Name (Bengali & English)
   - Generate slug
   - Description
   - Established Date
   - Website URL
4. Publish
Used in: Proposals, Resources
```

---

## 📊 Content Status

### Visibility Rules

**Featured News:**

- ✅ Shows on homepage IF `isFeatured = true`
- ✅ Always shows in news page

**Regular News:**

- ❌ Does NOT show on homepage if `isFeatured = false`
- ✅ Shows in news page grid

**Reform Updates:**

- ✅ Home: Shows 4 most recent
- ✅ News Page: Shows 5 per page (paginated)

**Party Statistics:**

- ✅ Auto-calculated from proposal positions
- ⚠️ Can be manually set in party document

**Dashboard Stats:**

- ⚠️ Manual entry only
- ✅ Real-time update on save

---

## 🎯 Best Practices

### Images

- **Featured News:** 1200x700px (landscape)
- **News Cards:** 800x500px (landscape)
- **Author Avatar:** 200x200px (square)
- **Party Logo:** 400x400px (square, transparent bg)
- **Format:** JPG, PNG, WebP

### Text Limits

- **Title:** Keep under 80 characters
- **Excerpt:** 150-200 characters
- **Description:** 300-500 characters
- **Body:** No limit (use block content)

### Categories

- ✅ Create categories BEFORE content
- ✅ Use consistent naming
- ✅ Assign meaningful colors
- ✅ One category per content item

### Bilingual Content

- ✅ Always fill both Bengali and English
- ✅ Bengali is default language
- ✅ Users can toggle language on frontend
- ⚠️ Empty translations show English as fallback

---

## 🔍 Finding Content

### Search in Sanity Studio

```
Use the search bar at top:
- Type: Content title
- Filter: By document type
- Sort: By date, title, etc.
```

### Filter Content

```
Click filter icon:
- Published/Draft status
- Date range
- Category
- Author
```

### Sort Content

```
Click sort icon:
- Latest first (default)
- Oldest first
- A-Z
- Z-A
```

---

## ⚠️ Common Issues

### "Content not showing on frontend"

```
✅ Check: Content is published (not draft)
✅ Check: Required fields are filled
✅ Check: Date is not in future
✅ Clear: Browser cache
✅ Wait: 1-2 minutes for CDN update
```

### "Featured news not on homepage"

```
✅ Check: "Is Featured" toggle is ON
✅ Check: Only 1 article should be featured
✅ Check: Article has featured image
```

### "Dashboard charts not updating"

```
✅ Check: Numbers are entered correctly
✅ Check: Array items are not empty
✅ Save: Document completely
✅ Refresh: Frontend page
```

### "File not downloadable"

```
✅ Check: File uploaded successfully
✅ Check: File size under 50MB
✅ Check: File type is supported
✅ Check: File URL is present
```

---

## 🆘 Need Help?

1. Check this guide first
2. Check main documentation: `SANITY_SCHEMA_MAPPING.md`
3. Contact development team
4. Check Sanity documentation: https://www.sanity.io/docs

---

**Quick Tips:**

- 💡 Draft content is not visible on frontend
- 💡 Always publish after saving
- 💡 Use preview mode to check before publishing
- 💡 Categories and authors should be created first
- 💡 Featured news should have high-quality images
- 💡 Dashboard stats should be updated regularly

---

**Last Updated:** November 5, 2025
