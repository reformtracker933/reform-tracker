import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const author = searchParams.get("author") || "";
    const date = searchParams.get("date") || "";

    const start = (page - 1) * limit;
    const end = start + limit;

    const filters = [];

    if (search) {
      filters.push(
        `(title match "*${search}*" || excerpt match "*${search}*")`,
      );
    }

    if (category && category !== "all") {
      filters.push(`category->title == "${category}"`);
    }

    if (author && author !== "all") {
      filters.push(`author->name == "${author}"`);
    }

    if (date) {
      // Convert publishedDate to string and check if it starts with the date
      filters.push(`string::startsWith(string(publishedDate), "${date}")`);
    }

    const filterString =
      filters.length > 0 ? ` && ${filters.join(" && ")}` : "";

    const query = groq`{
      "items": *[_type == "newsArticle"${filterString}] | order(publishedDate desc) [${start}...${end}] {
        _id,
        title,
        slug,
        excerpt,
        "featuredImage": featuredImage.asset->url,
        featuredImageAlt,
        "author": author->{
          _id,
          name,
          slug,
          "avatar": avatar.asset->url
        },
        "category": category->{
          _id,
          title,
          slug,
          color
        },
        publishedDate,
        isFeatured,
        language
      },
      "total": count(*[_type == "newsArticle"${filterString}])
    }`;

    const result = await client.fetch(query);

    return NextResponse.json({
      items: result.items || [],
      total: result.total || 0,
      page,
      limit,
      totalPages: Math.ceil((result.total || 0) / limit),
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
