// import { NextResponse } from "next/server";
// import prisma from "@/lib/db/prisma";
// import { getUserKey } from "@/lib/auth/utils/getUserKey";
// import { handleError } from "@/lib/api/error/handleError";
// import { getUser } from "@/lib/auth/utils/getUser";
// import { getNoteKey } from "@/lib/api/data/getNoteKey";
// import {
//   favoriteNoteQuery,
//   serializeFavoriteNote,
// } from "@/lib/api/data/serializeFavoriteNote";

// type Params = {
//   params: Promise<{ id: string }>;
// };

// export async function GET(_: Request, { params }: Params) {}

// export async function POST(req: Request, { params }: Params) {
//   try {
//     const userId = await getUser();
//     const userKey = await getUserKey(userId);
//     const { id: noteId } = await params;
//     const noteKey = await getNoteKey(noteId);

//     const favoriteNote = await prisma.favorite.create({
//       data: {
//         user: { connect: { id: userKey } },
//         note: { connect: { id: noteKey } },
//       },
//       ...favoriteNoteQuery,
//     });

//     const data = serializeFavoriteNote(favoriteNote);

//     return NextResponse.json(data);
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function DELETE(_: Request, { params }: Params) {}
