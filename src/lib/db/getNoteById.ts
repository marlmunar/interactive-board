import prisma from "@/lib/db/prisma";
import { NotFoundError } from "../api/error/apiError";
import { getHabitKey } from "../auth/utils/getHabitKey";
import { noteQuery } from "../api/data/serializeNote";

export const getNoteById = async (habitId: string, noteId: string) => {
  const habitKey = await getHabitKey(habitId);
  const note = await prisma.note.findFirst({
    where: { habitId: habitKey, publicId: noteId },
    ...noteQuery,
  });

  if (!note) {
    throw new NotFoundError(
      `Note with ID:${noteId} does not exist or has been missing`
    );
  }

  return note;
};
