import prisma from "@/lib/db/prisma";
import { NotFoundError } from "@/lib/error/apiError";

export const getHabitKey = async (habitId: string) => {
  const habitData = await prisma.habit.findFirst({
    where: { publicId: habitId },
  });

  if (!habitData) {
    throw new NotFoundError(
      `Habit with ID:${habitId} does not exist or has been missing`
    );
  }

  return habitData?.id;
};
