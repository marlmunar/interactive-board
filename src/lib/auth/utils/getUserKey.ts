import { getServerSession } from "next-auth";
import authOptions from "../authOptions";
import prisma from "@/lib/db/prisma";

export const getUserKey = async () => {
  const session = await getServerSession(authOptions);
  const userData = await prisma.user.findFirst({
    where: { publicId: session?.user?.id },
  });

  return userData?.id;
};
