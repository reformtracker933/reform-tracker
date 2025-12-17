import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'categories';

    let query = '';

    if (type === 'categories') {
      query = groq`*[_type == "category"] | order(title asc) {
        _id,
        title
      }`;
    } else if (type === 'commissions') {
      query = groq`*[_type == "commission"] | order(name asc) {
        _id,
        name
      }`;
    } else if (type === 'authors') {
      query = groq`*[_type == "author"] | order(name asc) {
        _id,
        name
      }`;
    } else if (type === 'themes') {
      query = groq`*[_type == "theme"] | order(name asc) {
        _id,
        name,
        color,
        icon
      }`;
    } else if (type === 'parties') {
      query = groq`*[_type == "commissionParty"] | order(name asc) {
        _id,
        name,
        fullName,
        color,
        "logo": logo.asset->url
      }`;
    }

    const result = await client.fetch(query);

    let items;
    if (type === 'themes' || type === 'parties') {
      // Return full object for themes and parties
      items = result.map((item: any) => ({
        _id: item._id,
        ...item,
      }));
    } else {
      // For other types, use existing mapping
      items =
        type === 'commissions'
          ? result.map((item: { _id: string; name: string }) => ({
              id: item._id,
              name: item.name,
            }))
          : type === 'authors'
            ? result.map((item: { _id: string; name: string }) => ({
                id: item._id,
                name: item.name,
              }))
            : result.map((item: { _id: string; title: string }) => ({
                id: item._id,
                name: item.title,
              }));
    }

    return NextResponse.json({
      success: true,
      data: items,
      total: items.length,
    });
  } catch (error) {
    console.error('Error fetching taxonomies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch taxonomies' },
      { status: 500 }
    );
  }
}
