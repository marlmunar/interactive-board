import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserKey } from "@/lib/auth/utils/getUserKey";
import { noteQuery, serializeNote } from "@/lib/api/data/serializeNote";
import { getNoteById } from "@/lib/db/getNoteById";
import { handleError } from "@/lib/api/error/handleError";
import { parseBody } from "@/lib/api/data/parseBody";
import { validate } from "@/lib/api/data/validate";
import { updateNoteSchema } from "@/schemas/note";
import { checkAuthorization } from "@/lib/auth/utils/checkAuthorization";
import { getUser } from "@/lib/auth/utils/getUser";
import { getNoteKey } from "@/lib/api/data/getNoteKey";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {}

export async function POST(req: Request, { params }: Params) {
  try {
    const userId = await getUser();
    const userKey = await getUserKey(userId);
    const { id: noteId } = await params;
    const noteKey = await getNoteKey(noteId);

    console.log(userKey);
    console.log(noteKey);

    const favoriteNote = await prisma.favorite.create({
      data: {
        user: { connect: { id: userKey } },
        note: { connect: { id: noteKey } },
      },
    });

    return NextResponse.json(favoriteNote);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_: Request, { params }: Params) {}
