import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const date = searchParams.get("date") || "";

    const offset = (page - 1) * limit;

    // Build filters array
    const filters: string[] = [];

    if (search) {
      filters.push(`title match "*${search}*"`);
    }

    if (category) {
      filters.push(`category->title == "${category}"`);
    }

    if (date) {
      filters.push(`string::startsWith(string(publishedDate), "${date}")`);
    }

    // Combine filters with AND
    const filterString =
      filters.length > 0 ? ` && ${filters.join(" && ")}` : "";

    // Query for reform updates
    const query = groq`{
      "items": *[_type == "reformUpdate"${filterString}] | order(publishedDate desc) [${offset}...${offset + limit}] {
        _id,
        title,
        publishedDate,
        slug,
        color,
        category->{
          _id,
          title,
          color
        },
        author->{
          _id,
          name
        }
      },
      "total": count(*[_type == "reformUpdate"${filterString}])
    }`;

    const result = await client.fetch(query);

    return NextResponse.json({
      items: result.items,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    });
  } catch (error) {
    console.error("Error fetching reform updates:", error);
    return NextResponse.json(
      { error: "Failed to fetch reform updates" },
      { status: 500 },
    );
  }
}
