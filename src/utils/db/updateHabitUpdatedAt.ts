import prisma from "@/lib/db/prisma";

export const updateHabitUpdatedAt = async (habitKey: number) => {
  const habit = await prisma.habitInteractionStat.update({
    where: { habitId: habitKey },
    data: {
      updatedAt: new Date(),
    },
  });
};
