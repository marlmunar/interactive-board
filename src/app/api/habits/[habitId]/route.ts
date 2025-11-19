import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { habitQuery, serializeHabit } from "@/lib/api/serializeHabit";

type Params = {
  params: Promise<{ habitId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { habitId } = await params;
  const userKey = await getUserKey();
  const habit = await prisma.habit.findFirst({
    where: { userId: userKey, publicId: habitId },
    ...habitQuery,
  });

  if (!habit) {
    return NextResponse.json({ error: "Habit not found" }, { status: 404 });
  }
  const data = serializeHabit(habit);
  return NextResponse.json(data);
}

export async function PATCH(req: Request, { params }: Params) {
  const { habitId } = await params;
  const userKey = await getUserKey();

  const habit = await prisma.habit.findFirst({
    where: { publicId: habitId, userId: userKey },
  });

  if (!habit) {
    return NextResponse.json({ error: "Habit not found" }, { status: 404 });
  }

  const body = await req.json();

  const updateData: any = {};
  if (body.name) updateData.name = body.name;
  if (body.description) updateData.description = body.description;
  if (body.progress) updateData.progress = body.progress;

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const updated = await prisma.habit.update({
    where: { publicId: habitId, userId: userKey },
    data: updateData,
    ...habitQuery,
  });

  const data = serializeHabit(updated);

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { habitId } = await params;

    await prisma.habit.delete({
      where: { publicId: habitId },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
