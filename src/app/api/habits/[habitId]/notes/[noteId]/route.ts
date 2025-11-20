import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { getHabitKey } from "@/lib/auth/utils/getHabitKey";
import { noteQuery, serializeNote } from "@/lib/api/data/serializeNote";
import { getNoteById } from "@/lib/db/getNoteById";
import { handleError } from "@/lib/api/error/handleError";
import { parseBody } from "@/lib/api/data/parseBody";
import { validate } from "@/lib/api/data/validate";
import { updateNoteSchema } from "@/schemas/note";

type Params = {
  params: Promise<{ habitId: string; noteId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { habitId, noteId } = await params;
    const note = await getNoteById(habitId, noteId);
    const data = serializeNote(note);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { habitId, noteId } = await params;
    await getNoteById(habitId, noteId);

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

    const data = serializeNote(updated);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { habitId, noteId } = await params;
    await getNoteById(habitId, noteId);

    await prisma.note.delete({
      where: { publicId: noteId },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
