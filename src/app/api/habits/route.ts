import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { habitQuery, serializeHabit } from "@/lib/api/data/serializeHabit";
import { parseBody } from "@/lib/api/data/parseBody";
import { validate } from "@/lib/api/data/validate";
import { createHabitSchema } from "@/schemas/habit";
import { handleError } from "@/lib/api/error/handleError";
import { getUser } from "@/lib/auth/utils/getUser";

export async function GET() {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const habits = await prisma.habit.findMany({
      where: { userId: userKey },
      ...habitQuery,
    });
    const data = habits.map(serializeHabit);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
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
    const data = serializeHabit(habit);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
