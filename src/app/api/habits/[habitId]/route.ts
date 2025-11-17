import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type Params = {
  params: Promise<{ habitId: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { habitId } = await params;
  const userKey = await getUserKey();
  const habit = await prisma.habit.findFirst({
    where: { userId: userKey, publicId: habitId },
    omit: {
      id: true,
    },
  });

  if (!habit) {
    return NextResponse.json({ error: "Habit not found" }, { status: 404 });
  }
  const { publicId: id, ...rest } = habit;
  const habitData = { id, ...rest };
  return NextResponse.json(habitData);
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
