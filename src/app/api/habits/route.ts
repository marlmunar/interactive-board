import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { habitQuery, serializeHabit } from "@/lib/api/data/serializeHabit";
import { parseBody } from "@/lib/api/data/parseBody";
import { validate } from "@/lib/api/data/validate";
import { createHabitSchema } from "@/schemas/habit";
import { handleError } from "@/lib/api/error/handleError";

export async function GET() {
  const userKey = await getUserKey();
  const habits = await prisma.habit.findMany({
    where: { userId: userKey },
    ...habitQuery,
  });
  const data = habits.map(serializeHabit);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const userKey = await getUserKey();

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
