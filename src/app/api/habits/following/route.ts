import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/utils/auth/getUserKey";
import { habitQuery, serializeHabit } from "@/utils/api/data/serializeHabit";
import { handleError } from "@/utils/api/error/handleError";
import { getUser } from "@/utils/auth/getUser";

export async function GET() {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const interactions = await prisma.interaction.findMany({
      where: { userId: userKey, resourceType: "HABIT", type: "FOLLOW" },
      orderBy: { createdAt: "desc" },
    });

    if (interactions.length > 0) {
      const followedIds = interactions.map((i) => i.resourceId);

      const habits = await prisma.habit.findMany({
        where: {
          id: { in: followedIds },
        },
        ...habitQuery,
      });
      const data = habits.map(serializeHabit);
      return NextResponse.json(data);
    }

    return NextResponse.json(interactions);
  } catch (error) {
    return handleError(error);
  }
}
