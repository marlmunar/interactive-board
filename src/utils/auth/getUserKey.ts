import { NotFoundError } from "@/lib/error/apiError";
import prisma from "@/lib/db/prisma";

export const getUserKey = async (userId: string) => {
  const userData = await prisma.user.findFirst({
    where: { publicId: userId },
  });

  if (!userData) {
    throw new NotFoundError(
      `User with ID:${userId} does not exist or has been missing`
    );
  }

  return userData?.id;
};
