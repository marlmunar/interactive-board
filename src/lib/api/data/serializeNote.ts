import { Prisma } from "@prisma/client";

export const noteQuery = {
  include: {
    user: {
      select: { username: true, publicId: true },
    },
    habit: {
      select: { publicId: true },
    },
    favorites: {
      select: {
        userId: true,
      },
    },
  },
};

export const serializeNote = (
  note: Prisma.NoteGetPayload<typeof noteQuery>
) => {
  const {
    id,
    publicId,
    user,
    habit,
    x,
    y,
    favorites,
    userId,
    habitId,
    ...rest
  } = note;

  return {
    id: publicId,
    author: { id: user.publicId, username: user.username },
    layout: { x, y },
    habit: { id: habit.publicId },
    isFavorite: favorites.length > 0,
    ...rest,
  };
};
