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
    const commission = searchParams.get("commission") || "";
    const date = searchParams.get("date") || "";

    const start = (page - 1) * limit;
    const end = start + limit;

    const filters = [];

    if (search) {
      filters.push(`title match "*${search}*"`);
    }

    if (category && category !== "all") {
      filters.push(`category->title == "${category}"`);
    }

    if (commission && commission !== "all") {
      filters.push(`commission->name == "${commission}"`);
    }

    if (date) {
      // Convert publishedDate to string and check if it starts with the date
      filters.push(`string::startsWith(string(publishedDate), "${date}")`);
    }

    const filterString =
      filters.length > 0 ? ` && ${filters.join(" && ")}` : "";

    const query = groq`{
      "items": *[_type == "resource"${filterString}] | order(publishedDate desc) [${start}...${end}] {
        _id,
        title,
        slug,
        "file": {
          "url": file.asset->url,
          "originalFilename": file.asset->originalFilename,
          "size": file.asset->size
        },
        fileSize,
        "category": category->{
          _id,
          title,
          slug,
          color
        },
        "commission": commission->{
          _id,
          name,
          slug
        },
        publishedDate,
        description,
        color,
        language,
        "thumbnail": thumbnail.asset->url
      },
      "total": count(*[_type == "resource"${filterString}])
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
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 },
    );
  }
}
