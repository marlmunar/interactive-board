import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/utils/auth/getUserKey";
import { getHabitKey } from "@/utils/api/data/getHabitKey";
import { noteQuery, serializeNote } from "@/utils/api/data/serializeNote";
import { parseBody } from "@/utils/api/data/parseBody";
import { validate } from "@/utils/api/data/validate";
import { createNoteSchema } from "@/schemas/note";
import { handleError } from "@/utils/api/error/handleError";
import { getUser } from "@/utils/auth/getUser";

type Params = {
  params: Promise<{ habitId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    await getUser();
    const { habitId } = await params;
    const habitKey = await getHabitKey(habitId);

    const habits = await prisma.note.findMany({
      where: { habitId: habitKey },
      orderBy: { updatedAt: "desc" },
      ...noteQuery,
    });

    const data = habits.map(serializeNote);

    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const { habitId } = await params;
    const habitKey = await getHabitKey(habitId);

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
