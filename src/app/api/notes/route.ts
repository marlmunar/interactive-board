import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const posts = await prisma.note.findMany();
  return NextResponse.json({ posts, session });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userRef = await prisma.user.findFirst({
    where: { publicId: session?.user?.id },
  });

  const body = await req.json();

  const { content, x, y } = body;

  if (!content || x == null || y == null) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const note = await prisma.note.create({
      data: {
        content,
        x,
        y,
        user: { connect: { id: userRef?.id } },
        habit: { connect: { id: 2 } },
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
