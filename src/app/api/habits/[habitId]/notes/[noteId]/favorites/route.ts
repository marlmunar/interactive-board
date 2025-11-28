import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/utils/auth/getUserKey";
import { handleError } from "@/utils/api/error/handleError";
import { getUser } from "@/utils/auth/getUser";
import { getNoteKey } from "@/utils/api/data/getNoteKey";
import {
  favoriteNoteQuery,
  serializeFavoriteNote,
} from "@/utils/api/data/serializeFavoriteNote";
import { checkAuthorization } from "@/utils/auth/checkAuthorization";
import { getHabitKey } from "@/utils/api/data/getHabitKey";
import { runQuery } from "@/utils/db/runQuery";

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

    await checkAuthorization({ habitId }, userKey);

    const favoriteNote = await runQuery(
      async () =>
        await prisma.favorite.create({
          data: {
            user: { connect: { id: userKey } },
            note: { connect: { id: noteKey } },
          },
          ...favoriteNoteQuery,
        }),
      "Favorite note",
      { userId, noteId }
    );

    const data = serializeFavoriteNote(favoriteNote);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);

    const { habitId, noteId } = await params;

    const habitKey = await getHabitKey(habitId);
    const noteKey = await getNoteKey(habitKey, noteId);

    await checkAuthorization({ habitId }, userKey);

    await runQuery(
      async () =>
        await prisma.favorite.delete({
          where: {
            userId_noteId: {
              userId: userKey,
              noteId: noteKey,
            },
          },
        }),
      "Favorite note",
      { userId, noteId }
    );

    return NextResponse.json({
      message: `Note with ID:${noteId} is successfully unmarked as favorite`,
    });
  } catch (error) {
    return handleError(error);
  }
}
