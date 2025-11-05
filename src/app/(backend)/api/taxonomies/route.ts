import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "categories";

    let query = "";

    if (type === "categories") {
      query = groq`*[_type == "category"] | order(title asc) {
        _id,
        title
      }`;
    } else if (type === "commissions") {
      query = groq`*[_type == "commission"] | order(name asc) {
        _id,
        name
      }`;
    } else if (type === "authors") {
      query = groq`*[_type == "author"] | order(name asc) {
        _id,
        name
      }`;
    }

    const result = await client.fetch(query);

    const items =
      type === "commissions"
        ? result.map((item: { _id: string; name: string }) => ({
            id: item._id,
            name: item.name,
          }))
        : type === "authors"
          ? result.map((item: { _id: string; name: string }) => ({
              id: item._id,
              name: item.name,
            }))
          : result.map((item: { _id: string; title: string }) => ({
              id: item._id,
              name: item.title,
            }));

    return NextResponse.json({
      items,
      total: items.length,
    });
  } catch (error) {
    console.error("Error fetching taxonomies:", error);
    return NextResponse.json(
      { error: "Failed to fetch taxonomies" },
      { status: 500 },
    );
  }
}
