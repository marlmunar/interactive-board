import { Prisma } from "@prisma/client";

export const noteQuery = {
  include: {
    user: {
      select: { username: true, publicId: true },
    },
    habit: {
      select: { publicId: true },
    },
  },
};

export const serializeNote = (
  habit: Prisma.NoteGetPayload<typeof noteQuery>
) => {
  const {
    id,
    publicId,
    user,
    userId: userKey,
    habit: habitRef,
    habitId: habitKey,
    x,
    y,
    ...rest
  } = habit;
  const { publicId: userId, username } = user;
  const { publicId: habitId } = habitRef;

  const serialized = {
    id: publicId,
    author: {
      id: userId,
      username,
    },
    layout: { x, y },
    habit: { id: habitId },
    ...rest,
  };
  return serialized;
};
