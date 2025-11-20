import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { getHabitKey } from "@/lib/auth/utils/getHabitKey";
import { noteQuery, serializeNote } from "@/lib/api/data/serializeNote";
import { parseBody } from "@/lib/api/data/parseBody";
import { validate } from "@/lib/api/data/validate";
import { createNoteSchema } from "@/schemas/note";
import { handleError } from "@/lib/api/error/handleError";

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
  try {
    const { habitId } = await params;
    const habitKey = await getHabitKey(habitId);
    const userKey = await getUserKey();

    const body = await parseBody(req);
    validate(createNoteSchema, body, "note");

    const { content, x, y } = body;
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
    return handleError(error);
  }
}
