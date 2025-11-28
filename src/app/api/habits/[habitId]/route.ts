import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { habitQuery, serializeHabit } from "@/utils/api/data/serializeHabit";
import { handleError } from "@/utils/api/error/handleError";
import { BadRequestError, NotFoundError } from "@/lib/error/apiError";
import { getHabitById } from "@/utils/db/getHabitById";
import { parseBody } from "@/utils/api/data/parseBody";
import { updateHabitSchema } from "@/schemas/habit";
import { validate } from "@/utils/api/data/validate";
import { checkAuthorization } from "@/utils/auth/checkAuthorization";
import { getUser } from "@/utils/auth/getUser";
import { getUserKey } from "@/utils/auth/getUserKey";

type Params = {
  params: Promise<{ habitId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    await getUser();
    const { habitId } = await params;
    const habit = await getHabitById(habitId);

    const data = serializeHabit(habit);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const { habitId } = await params;
    await getHabitById(habitId);
    await checkAuthorization({ habitId }, userKey);

    const body = await parseBody(req);
    const validated = validate(updateHabitSchema, body, "habit");

    if (Object.keys(validated).length === 0) {
      throw new BadRequestError("No fields to update");
    }

    const updated = await prisma.habit.update({
      where: { publicId: habitId },
      data: validated,
      ...habitQuery,
    });

    const data = serializeHabit(updated);
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const { habitId } = await params;
    await getHabitById(habitId);
    await checkAuthorization({ habitId }, userKey);

    await prisma.habit.delete({
      where: { publicId: habitId },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
