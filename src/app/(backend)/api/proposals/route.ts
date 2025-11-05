import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const commission = searchParams.get("commission") || "";
    const date = searchParams.get("date") || "";
    const language = searchParams.get("language") || "bn";

    const start = (page - 1) * limit;
    const end = start + limit;

    const filters = [`language == "${language}"`];

    if (search) {
      filters.push(`title match "*${search}*"`);
    }

    if (category && category !== "all") {
      filters.push(`category->_id == "${category}"`);
    }

    if (commission && commission !== "all") {
      filters.push(`commission->_id == "${commission}"`);
    }

    if (date) {
      // Convert publishedDate to string and check if it starts with the date
      filters.push(`string::startsWith(string(publishedDate), "${date}")`);
    }

    const filterString = filters.join(" && ");

    const query = groq`{
      "items": *[_type == "proposal" && ${filterString}] | order(publishedDate desc) [${start}...${end}] {
        _id,
        title,
        slug,
        "commission": commission->{
          name
        },
        "category": category->{
          title,
          color
        },
        color,
        publishedDate,
        status,
        partyPositions[] {
          "party": party->{
            _id,
            name,
            slug,
            color
          },
          stance,
          votingDate
        }
      },
      "total": count(*[_type == "proposal" && ${filterString}])
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
    console.error("Error fetching proposals:", error);
    return NextResponse.json(
      { error: "Failed to fetch proposals" },
      { status: 500 },
    );
  }
}
