import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { subscribe } from "diagnostics_channel";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest,{params}: {params:any}) {

    const {id} = await params as {
        id: string
    }

  
console.log('Endpoint hint')
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
    console.log(
      `[GET /api/users/${id}] → DB lookup result:`,
      JSON.stringify(userProfile, null, 2)
    );
    if (userProfile) {
      return NextResponse.json(userProfile, { status: 200 });
    }

    // 2) Not in DB → fetch from Clerk
    const clerk = await clerkClient();
    console.log(`[GET /api/users/${id}] → Clerk client initialized`);
    const clerkUser = await clerk.users.getUser(id);
    console.log(
      `[GET /api/users/${id}] → Clerk user data:`,
      JSON.stringify(
        {
          id: clerkUser.id,
          emailAddresses: clerkUser.emailAddresses,
          imageUrl: clerkUser.imageUrl,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
        },
        null,
        2
      )
    );

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
    console.log(
      `[GET /api/users/${id}] → New DB record:`,
      JSON.stringify(newUser, null, 2)
    );

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error(`[GET /api/users/${id}] → Error:`, err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}