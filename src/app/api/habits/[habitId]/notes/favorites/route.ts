import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/utils/auth/getUserKey";
import { handleError } from "@/utils/api/error/handleError";
import { getUser } from "@/utils/auth/getUser";
import { checkAuthorization } from "@/utils/auth/checkAuthorization";
import { noteQuery, serializeNote } from "@/utils/api/data/serializeNote";

type Params = {
  params: Promise<{ habitId: string }>;
};

export async function GET(req: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const { habitId } = await params;

    await checkAuthorization("habit", habitId, userKey);

    const favoriteNotes = await prisma.note.findMany({
      where: {
        habit: { userId: userKey, publicId: habitId },
        favoriteCount: { gt: 0 },
      },
      ...noteQuery,
    });

    const data = favoriteNotes.map(serializeNote);

    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
