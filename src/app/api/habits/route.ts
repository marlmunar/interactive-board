import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/utils/auth/getUserKey";
import { habitQuery, serializeHabit } from "@/utils/api/data/serializeHabit";
import { parseBody } from "@/utils/api/data/parseBody";
import { validate } from "@/utils/api/data/validate";
import { createHabitSchema } from "@/schemas/habit";
import { handleError } from "@/utils/api/error/handleError";
import { getUser } from "@/utils/auth/getUser";

export async function GET() {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const habits = await prisma.habit.findMany({
      where: { userId: userKey },
      orderBy: { updatedAt: "desc" },
      ...habitQuery,
    });
    const data = habits.map(serializeHabit);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);

    const body = await parseBody(req);
    validate(createHabitSchema, body, "habit");

    const { name, description } = body;
    const habit = await prisma.habit.create({
      data: {
        name,
        description,
        user: { connect: { id: userKey } },
      },
      ...habitQuery,
    });
    await prisma.habitInteractionStat.create({
      data: { habitId: habit.id },
    });
    const data = serializeHabit(habit);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
