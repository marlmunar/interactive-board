import authOptions from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userRef = await prisma.user.findFirst({
    where: { publicId: session?.user?.id },
  });

  const body = await req.json();

  const { content, x, y } = body;

  if (!content || !x || !y) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  //   const habitRef = await prisma.habit.findFirst({
  //     where: { publicId:  },
  //   });

  try {
    const note = await prisma.note.create({
      data: {
        content,
        x,
        y,
        user: { connect: { id: userRef?.id } },
        habit: { connect: { id: 1 } },
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
