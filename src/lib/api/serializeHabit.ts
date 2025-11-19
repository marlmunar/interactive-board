import { Prisma } from "@prisma/client";

export const habitQuery = {
  include: {
    user: {
      select: { username: true, publicId: true },
    },
  },
};

export const serializeHabit = (
  habit: Prisma.HabitGetPayload<typeof habitQuery>
) => {
  const { id, publicId, user, userId: userKey, ...rest } = habit;
  const { publicId: userId, username } = user;
  const serialized = {
    id: publicId,
    author: {
      id: userId,
      username,
    },
    ...rest,
  };
  return serialized;
};
