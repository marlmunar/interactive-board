import { Prisma } from "@prisma/client";

export const habitQuery = {
  include: {
    user: {
      select: { username: true, publicId: true },
    },
    interactionStats: {
      omit: { habitId: true },
    },
  },
};

export const serializeHabit = (
  habit: Prisma.HabitGetPayload<typeof habitQuery>
) => {
  const {
    id,
    publicId,
    user,
    userId: userKey,
    interactionStats,
    ...rest
  } = habit;
  const { publicId: userId, username } = user;
  const { updatedAt: statsUpdatedAt, ...stats } = interactionStats[0];
  const serialized = {
    id: publicId,
    author: {
      id: userId,
      username,
    },
    interactionStats: {
      ...stats,
      lastActivity: statsUpdatedAt,
    },
    ...rest,
  };
  return serialized;
};
