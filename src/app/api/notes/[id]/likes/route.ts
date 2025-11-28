import { getUserKey } from "@/utils/auth/getUserKey";
import { handleError } from "@/utils/api/error/handleError";
import { getUser } from "@/utils/auth/getUser";
import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import toggleInteraction from "@/utils/interactions/toggleInteraction";
import { InteractionType, ResourceType } from "@/generated/prisma/enums";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);

    const { id } = await params;
    console.log(id);
    const note = await prisma.note.findFirstOrThrow({
      where: { publicId: id },
    });

    const result = await toggleInteraction({
      userId: userKey,
      resourceType: ResourceType.NOTE,
      resourceId: Number(note?.id),
      type: InteractionType.LIKE,
    });
    // const habitKey = await getHabitKey(habitId);
    // const noteKey = await getNoteKey(habitKey, noteId);

    // await checkAuthorization({ habitId }, userKey);

    // const interaction = await runQuery(
    //   async () =>
    //     await prisma.favorite.create({
    //       data: {
    //         user: { connect: { id: userKey } },
    //         note: { connect: { id: noteKey } },
    //       },
    //       ...favoriteNoteQuery,
    //     }),
    //   "Favorite note",
    //   { userId, noteId }
    // );

    // const data = serializeFavoriteNote();

    const response = `Note with id:${id} is ${
      result.active ? "liked" : "unliked"
    }`;

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
