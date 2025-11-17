import prisma from "@/lib/db/prisma";

export const getHabitKey = async (habitId: string) => {
  const habitData = await prisma.habit.findFirst({
    where: { publicId: habitId },
  });

  return habitData?.id;
};
