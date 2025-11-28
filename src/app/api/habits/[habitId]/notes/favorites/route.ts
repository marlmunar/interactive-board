import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/utils/auth/getUserKey";
import { handleError } from "@/utils/api/error/handleError";
import { getUser } from "@/utils/auth/getUser";

import {
  favoriteNoteQuery,
  serializeFavoriteNote,
} from "@/utils/api/data/serializeFavoriteNote";
import { checkAuthorization } from "@/utils/auth/checkAuthorization";

type Params = {
  params: Promise<{ habitId: string }>;
};

export async function GET(req: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const { habitId } = await params;

    await checkAuthorization({ habitId }, userKey);

    const favoriteNotes = await prisma.favorite.findMany({
      where: { userId: userKey, note: { habit: { publicId: habitId } } },
      ...favoriteNoteQuery,
    });

    const data = favoriteNotes.map(serializeFavoriteNote);

    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
