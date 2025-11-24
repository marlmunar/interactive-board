import prisma from "@/lib/db/prisma";
import { NotFoundError } from "../api/error/apiError";
import { getHabitKey } from "../api/data/getHabitKey";
import { noteQuery } from "../api/data/serializeNote";

export const getNoteById = async (habitId: string, noteId: string) => {
  const habitKey = await getHabitKey(habitId);
  const note = await prisma.note.findFirst({
    where: { habitId: habitKey, publicId: noteId },
    ...noteQuery,
  });

  console.log(note);

  if (!note) {
    throw new NotFoundError(
      `Note with ID:${noteId} does not exist or has been missing`
    );
  }

  return note;
};
