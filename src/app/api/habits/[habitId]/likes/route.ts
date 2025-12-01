import { getUserKey } from "@/utils/auth/getUserKey";
import { handleError } from "@/utils/api/error/handleError";
import { getUser } from "@/utils/auth/getUser";
import { NextResponse } from "next/server";
import toggleInteraction from "@/utils/interactions/toggleInteraction";
import { InteractionType, ResourceType } from "@/generated/prisma/enums";
import { getHabitKey } from "@/utils/api/data/getHabitKey";
import { checkOwnership } from "@/utils/auth/checkOwnership";
import { ForbiddenError } from "@/lib/error/apiError";

type Params = {
  params: Promise<{ habitId: string }>;
};

export async function POST(req: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);

    const { habitId } = await params;
    const habitKey = await getHabitKey(habitId);

    const isOwner = await checkOwnership("habit", habitId, userKey);

    if (isOwner)
      throw new ForbiddenError(
        "Performing this action to your own resource is not allowed."
      );

    const result = await toggleInteraction({
      userId: userKey,
      resourceType: ResourceType.HABIT,
      resourceId: habitKey,
      type: InteractionType.LIKE,
    });

    const response = `Habit with id:${habitId} is ${
      result.active ? "liked" : "unliked"
    }`;

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
