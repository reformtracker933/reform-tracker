import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("সংস্কার ট্র্যাকার সিএমএস / Reform Tracker CMS")
    .items([
      // Content Section
      S.listItem()
        .title("কন্টেন্ট / Content")
        .child(
          S.list()
            .title("কন্টেন্টের ধরন / Content Types")
            .items([
              S.documentTypeListItem("newsArticle").title(
                "সংবাদ নিবন্ধ / News Articles",
              ),
              S.documentTypeListItem("reformUpdate").title(
                "সংস্কার আপডেট / Reform Updates",
              ),
              S.documentTypeListItem("resource").title("রিসোর্স / Resources"),
              S.documentTypeListItem("proposal").title("প্রস্তাব / Proposals"),
            ]),
        ),

      S.divider(),

      // Politics Section
      S.listItem()
        .title("রাজনীতি / Politics")
        .child(
          S.list()
            .title("রাজনৈতিক ডেটা / Political Data")
            .items([
              S.documentTypeListItem("politicalParty").title(
                "রাজনৈতিক দল / Political Parties",
              ),
            ]),
        ),

      S.divider(),

      // Statistics & Charts Section
      S.listItem()
        .title("পরিসংখ্যান ও চার্ট / Statistics & Charts")
        .child(
          S.list()
            .title("ড্যাশবোর্ড ডেটা / Dashboard Data")
            .items([
              S.documentTypeListItem("dashboardStats").title(
                "ড্যাশবোর্ড পরিসংখ্যান / Dashboard Statistics",
              ),
              S.documentTypeListItem("chartConfig").title(
                "চার্ট কনফিগারেশন / Chart Configurations",
              ),
            ]),
        ),

      S.divider(),

      // Taxonomy Section
      S.listItem()
        .title("শ্রেণীবিন্যাস / Taxonomy")
        .child(
          S.list()
            .title("শ্রেণীবিভাগ / Classification")
            .items([
              S.documentTypeListItem("category").title("বিভাগ / Categories"),
              S.documentTypeListItem("author").title("লেখক / Authors"),
              S.documentTypeListItem("commission").title("কমিশন / Commissions"),
            ]),
        ),

      S.divider(),

      // All Documents (fallback for any other types)
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "newsArticle",
            "reformUpdate",
            "resource",
            "proposal",
            "politicalParty",
            "dashboardStats",
            "chartConfig",
            "category",
            "author",
            "commission",
          ].includes(item.getId()!),
      ),
    ]);
