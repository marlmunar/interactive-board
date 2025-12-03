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
import { updateHabitUpdatedAt } from "@/utils/db/updateHabitUpdatedAt";
import { getHabitOwnerKey } from "@/utils/api/data/getHabitOwnerKey";

type Params = {
  params: Promise<{ habitId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);

    const { habitId } = await params;
    const habitKey = await getHabitKey(habitId);

    const habits = await prisma.note.findMany({
      where: {
        habitId: habitKey,
        OR: [
          { isPrivate: false }, // public
          { userId: userKey }, // user is the author
          {
            allowedViewers: {
              some: { id: userKey },
            },
          },
        ],
      },
      orderBy: { updatedAt: "desc" },
      ...noteQuery,
    });

    const data = await Promise.all(
      habits.map(async (note) => await serializeNote(note))
    );

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
    const habitOwnerKey = await getHabitOwnerKey(habitId);

    const body = await parseBody(req);
    validate(createNoteSchema, body, "note");

    const { content, x, y } = body;
    const isPrivate = body.isPrivate === undefined ? false : body.isPrivate;
    const allowedViewersData = isPrivate
      ? {
          connect: [{ id: habitOwnerKey }],
        }
      : undefined;

    const note = await prisma.note.create({
      data: {
        content,
        x,
        y,
        user: { connect: { id: userKey } },
        habit: { connect: { id: habitKey } },
        isPrivate,
        ...(allowedViewersData && { allowedViewers: allowedViewersData }),
      },
      ...noteQuery,
    });
    await updateHabitUpdatedAt(habitKey);
    const data = await serializeNote(note);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
