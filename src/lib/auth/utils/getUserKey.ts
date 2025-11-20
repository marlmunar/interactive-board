import prisma from "@/lib/db/prisma";

export const getUserKey = async (userId: string) => {
  const userData = await prisma.user.findFirst({
    where: { publicId: userId },
  });

  if (!userData) return NaN;

  return userData?.id;
};
