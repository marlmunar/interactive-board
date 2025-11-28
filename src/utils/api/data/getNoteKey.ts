import prisma from "@/lib/db/prisma";
import { NotFoundError } from "@/lib/error/apiError";

export const getNoteKey = async (habitKey: number, noteId: string) => {
  const noteData = await prisma.note.findFirst({
    where: { publicId: noteId, habitId: habitKey },
  });

  if (!noteData) {
    throw new NotFoundError(
      `Note with ID:${noteId} does not exist or has been missing`
    );
  }

  return noteData?.id;
};
