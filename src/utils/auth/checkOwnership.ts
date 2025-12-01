import prisma from "@/lib/db/prisma";

const resourceQueries = {
  habit: (id: string, userId: number) =>
    prisma.habit.findFirst({
      where: { publicId: id, userId },
    }),

  note: (id: string, userId: number) =>
    prisma.note.findFirst({
      where: { publicId: id, userId },
    }),
};

export const checkOwnership = async (
  resourceType: keyof typeof resourceQueries,
  resourceId: string,
  userId: number
) => {
  const result = await resourceQueries[resourceType](resourceId, userId);

  return !!result;
};
