import { NextRequest, NextResponse } from "next/server";
import { client, writeClient } from "@/sanity/lib/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Check if email already exists (using read client)
    const existingSubscriber = await client.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email },
    );

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 },
      );
    }

    // Create new subscriber (using write client)
    const subscriber = await writeClient.create({
      _type: "subscriber",
      email,
      name: name || undefined,
      source: source || "newsletter",
      subscribedAt: new Date().toISOString(),
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
        subscriber: {
          email: subscriber.email,
          name: subscriber.name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 },
    );
  }
}
