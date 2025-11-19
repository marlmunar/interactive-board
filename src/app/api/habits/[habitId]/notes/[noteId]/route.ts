import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { getHabitKey } from "@/lib/auth/utils/getHabitKey";
import { noteQuery, serializeNote } from "@/lib/api/serializeNote";

type Params = {
  params: Promise<{ habitId: string; noteId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { habitId, noteId } = await params;
  const habitKey = await getHabitKey(habitId);

  const note = await prisma.note.findFirst({
    where: { habitId: habitKey, publicId: noteId },
    ...noteQuery,
  });

  if (!note) {
    return NextResponse.json({ error: "Habit not found" }, { status: 404 });
  }
  const data = serializeNote(note);
  return NextResponse.json(data);
}

export async function PATCH(req: Request, { params }: Params) {
  const { habitId, noteId } = await params;
  const habitKey = await getHabitKey(habitId);

  const habit = await prisma.note.findFirst({
    where: { publicId: noteId, habitId: habitKey },
  });

  if (!habit) {
    return NextResponse.json({ error: "Habit not found" }, { status: 404 });
  }

  const body = await req.json();

  const allowedFields = ["likes", "isFavorite", "content", "x", "y"];

  const updateData: Record<string, any> = {};

  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      updateData[key] = body[key];
    }
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const updated = await prisma.note.update({
    where: { publicId: noteId, habitId: habitKey },
    data: updateData,
    ...noteQuery,
  });

  const data = serializeNote(updated);

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { habitId, noteId } = await params;
    const habitKey = await getHabitKey(habitId);

    await prisma.note.delete({
      where: { habitId: habitKey, publicId: noteId },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
