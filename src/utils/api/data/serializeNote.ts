import prisma from "@/lib/db/prisma";
import { getUser } from "@/utils/auth/getUser";
import { getUserKey } from "@/utils/auth/getUserKey";
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

export const serializeNote = async (
  note: Prisma.NoteGetPayload<typeof noteQuery>
) => {
  const currentUserId = await getUser();
  const currentUserKey = await getUserKey(currentUserId);
  const {
    id,
    publicId,
    user,
    habit,
    x,
    y,
    favoriteCount,
    likeCount,
    userId,
    habitId,
    ...rest
  } = note;

  const interactions = await prisma.interaction.findMany({
    where: {
      resourceId: id,
    },
  });

  const likedByIds = interactions
    .filter((i) => i.type === "LIKE")
    .map((i) => i.userId);

  return {
    id: publicId,
    author: { id: user.publicId, username: user.username },
    layout: { x, y },
    habit: { id: habit.publicId },

    interactionStats: {
      isFavorite: favoriteCount > 0,
      isLikedByCurrentUser: likedByIds.includes(currentUserKey),
      likeCount,
    },

    ...rest,
  };
};
