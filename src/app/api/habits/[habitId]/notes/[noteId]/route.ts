import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/utils/auth/getUserKey";
import { noteQuery, serializeNote } from "@/utils/api/data/serializeNote";
import { getNoteById } from "@/utils/db/getNoteById";
import { handleError } from "@/utils/api/error/handleError";
import { parseBody } from "@/utils/api/data/parseBody";
import { validate } from "@/utils/api/data/validate";
import { updateNoteSchema } from "@/schemas/note";
import { checkAuthorization } from "@/utils/auth/checkAuthorization";
import { getUser } from "@/utils/auth/getUser";
import { updateHabitUpdatedAt } from "@/utils/db/updateHabitUpdatedAt";
import { getHabitKey } from "@/utils/api/data/getHabitKey";

type Params = {
  params: Promise<{ habitId: string; noteId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    await getUser();
    const { habitId, noteId } = await params;
    const note = await getNoteById(habitId, noteId);
    const data = await serializeNote(note);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const { habitId, noteId } = await params;
    await getNoteById(habitId, noteId);
    await checkAuthorization("note", noteId, userKey);

    const body = await parseBody(req);
    const validated = validate(updateNoteSchema, body, "note");

    if (Object.keys(validated).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const updated = await prisma.note.update({
      where: { publicId: noteId },
      data: validated,
      ...noteQuery,
    });

    const habitKey = await getHabitKey(habitId);
    await updateHabitUpdatedAt(habitKey);

    const data = await serializeNote(updated);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const { habitId, noteId } = await params;
    await getNoteById(habitId, noteId);
    await checkAuthorization("note", noteId, userKey);

    await prisma.note.delete({
      where: { publicId: noteId },
    });

    const habitKey = await getHabitKey(habitId);
    await updateHabitUpdatedAt(habitKey);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
