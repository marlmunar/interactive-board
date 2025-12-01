import prisma from "@/lib/db/prisma";
import { ForbiddenError } from "@/lib/error/apiError";

const resourceQueries = {
  habit: (id: string, userId: number) =>
    prisma.habit.findFirst({
      where: { publicId: id, userId },
    }),

  note: (id: string, userId: number) =>
    prisma.note.findFirst({
      where: {
        publicId: id,
        OR: [{ userId }, { habit: { userId } }],
      },
    }),
};

export const checkAuthorization = async (
  resourceType: keyof typeof resourceQueries,
  resourceId: string,
  userId: number
) => {
  const result = await resourceQueries[resourceType](resourceId, userId);

  if (!result) {
    throw new ForbiddenError(
      "You do not have permission to access this resource."
    );
  }

  return result !== null;
};
