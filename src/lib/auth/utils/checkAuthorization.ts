import { ForbiddenError } from "@/lib/api/error/apiError";
import prisma from "@/lib/db/prisma";

interface Params {
  habitId: string;
  noteId?: string;
}

const findHabit = async (resourceId: string, userKey: number) => {
  return await prisma.habit.findFirst({
    where: {
      publicId: resourceId,
      userId: userKey,
    },
  });
};

const findNote = async (resourceId: string, userKey: number) => {
  return await prisma.note.findFirst({
    where: {
      publicId: resourceId,
      OR: [{ userId: userKey }, { habit: { userId: userKey } }],
    },
  });
};

export const checkAuthorization = async (params: Params, userKey: number) => {
  const { habitId, noteId } = params;
  const resourceId = noteId ? noteId : habitId;
  const canDelete = noteId
    ? await findNote(resourceId, userKey)
    : await findHabit(resourceId, userKey);
  if (!canDelete) {
    throw new ForbiddenError("You cannot make changes on this resource");
  }
};
