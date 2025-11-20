import prisma from "@/lib/db/prisma";
import { habitQuery } from "../api/data/serializeHabit";
import { NotFoundError } from "../api/error/apiError";

export const getHabitById = async (habitId: string) => {
  const habit = await prisma.habit.findFirst({
    where: { publicId: habitId },
    ...habitQuery,
  });

  if (!habit) {
    throw new NotFoundError(
      `Habit with ID:${habitId} does not exist or has been missing`
    );
  }

  return habit;
};
