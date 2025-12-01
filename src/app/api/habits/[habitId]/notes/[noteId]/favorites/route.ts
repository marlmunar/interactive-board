import { getUserKey } from "@/utils/auth/getUserKey";
import { handleError } from "@/utils/api/error/handleError";
import { getUser } from "@/utils/auth/getUser";
import { NextResponse } from "next/server";
import toggleInteraction from "@/utils/interactions/toggleInteraction";
import { InteractionType, ResourceType } from "@/generated/prisma/enums";
import { getNoteKey } from "@/utils/api/data/getNoteKey";
import { getHabitKey } from "@/utils/api/data/getHabitKey";
import { checkAuthorization } from "@/utils/auth/checkAuthorization";
import { checkOwnership } from "@/utils/auth/checkOwnership";
import { ForbiddenError } from "@/lib/error/apiError";

type Params = {
  params: Promise<{ habitId: string; noteId: string }>;
};

export async function POST(req: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);

    const { habitId, noteId } = await params;
    const habitKey = await getHabitKey(habitId);
    const noteKey = await getNoteKey(habitKey, noteId);

    await checkAuthorization("habit", habitId, userKey);

    const isOwner = await checkOwnership("note", noteId, userKey);

    if (isOwner)
      throw new ForbiddenError(
        "Performing this action to your own resource is not allowed."
      );

    const result = await toggleInteraction({
      userId: userKey,
      resourceType: ResourceType.NOTE,
      resourceId: noteKey,
      type: InteractionType.FAVORITE,
    });

    const response = `Note with id:${noteId} is ${
      result.active ? "marked" : "unmarked"
    } as favorite`;

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
