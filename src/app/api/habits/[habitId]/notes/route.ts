import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { getHabitKey } from "@/lib/auth/utils/getHabitKey";
import { noteQuery, serializeNote } from "@/lib/api/serializeNote";

type Params = {
  params: Promise<{ habitId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { habitId } = await params;
  const habitKey = await getHabitKey(habitId);

  const habits = await prisma.note.findMany({
    where: { habitId: habitKey },
    ...noteQuery,
  });

  const data = habits.map(serializeNote);

  return NextResponse.json(data);
}

export async function POST(req: Request, { params }: Params) {
  const { habitId } = await params;
  const habitKey = await getHabitKey(habitId);
  const userKey = await getUserKey();

  const body = await req.json();

  const { content, x, y } = body;
  if (!content || !x || !y) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const note = await prisma.note.create({
      data: {
        content,
        x,
        y,
        user: { connect: { id: userKey } },
        habit: { connect: { id: habitKey } },
      },
      ...noteQuery,
    });
    const data = serializeNote(note);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
