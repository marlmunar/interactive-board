import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { habitQuery, serializeHabit } from "@/lib/api/serializeHabit";

export async function GET() {
  const userKey = await getUserKey();
  const habits = await prisma.habit.findMany({
    where: { userId: userKey },
    ...habitQuery,
  });
  const data = habits.map(serializeHabit);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const userKey = await getUserKey();

  const body = await req.json();

  const { name, description } = body;

  if (!name || !description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const habit = await prisma.habit.create({
      data: {
        name,
        description,
        user: { connect: { id: userKey } },
      },
      ...habitQuery,
    });
    const data = serializeHabit(habit);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
