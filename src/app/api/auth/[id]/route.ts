import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  const { id } = params as { id: string };

  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:5174",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

 
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers,
    });
  }

  console.log(`[GET /api/users/${id}] → Start`);

  try {
    // 1) Try to load from your DB
    const userProfile = await client.user.findUnique({
      where: { clerkid: id },
      include: {
        studio: true,
        WorkSpace: true,
        subscription: { select: { plan: true } },
      },
    });

    if (userProfile) {
      return new NextResponse(JSON.stringify(userProfile), {
        status: 200,
        headers,
      });
    }

    // 2) Not in DB → fetch from Clerk
    const clerkUser = await clerkClient.users.getUser(id);

    // 3) Create in DB
    const newUser = await client.user.create({
      data: {
        clerkid: id,
        email: clerkUser.emailAddresses[0].emailAddress,
        image: clerkUser.imageUrl || "",
        firstname: clerkUser.firstName,
        lastname: clerkUser.lastName,
        studio: { create: {} },
        WorkSpace: {
          create: {
            name: `${clerkUser.firstName}'s workspace`,
            type: "PERSONAL",
          },
        },
        subscription: { create: {} },
      },
      include: {
        studio: true,
        WorkSpace: true,
        subscription: { select: { plan: true } },
      },
    });

    return new NextResponse(JSON.stringify(newUser), {
      status: 201,
      headers,
    });
  } catch (err) {
    console.error(`[GET /api/users/${id}] → Error:`, err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers }
    );
  }
}
