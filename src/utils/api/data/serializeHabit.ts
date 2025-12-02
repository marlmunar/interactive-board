import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/db/prisma";
import { getUser } from "@/utils/auth/getUser";
import { getUserKey } from "@/utils/auth/getUserKey";

export const habitQuery = {
  include: {
    user: {
      select: { username: true, publicId: true },
    },
    interactionStats: {
      omit: { habitId: true },
    },
    _count: {
      select: { notes: true },
    },
  },
};

export const serializeHabit = async (
  habit: Prisma.HabitGetPayload<typeof habitQuery>
) => {
  const currentUserId = await getUser();
  const currentUserKey = await getUserKey(currentUserId);
  const {
    id,
    publicId,
    user,
    userId: userKey,
    interactionStats,
    _count,
    ...rest
  } = habit;

  const { updatedAt: statsUpdatedAt, ...stats } = interactionStats[0];

  const interactions = await prisma.interaction.findMany({
    where: {
      resourceId: id,
    },
  });

  const likedByIds = interactions
    .filter((i) => i.type === "LIKE")
    .map((i) => i.userId);

  const followedByIds = interactions
    .filter((i) => i.type === "FOLLOW")
    .map((i) => i.userId);

  return {
    id: publicId,
    author: { id: user.publicId, username: user.username },
    interactionStats: {
      ...stats,
      lastActivity: statsUpdatedAt,
      noteCount: _count.notes,
      isLikedByCurrentUser: likedByIds.includes(currentUserKey),
      isFollowedByCurrentUser: followedByIds.includes(currentUserKey),
    },
    ...rest,
  };
};
