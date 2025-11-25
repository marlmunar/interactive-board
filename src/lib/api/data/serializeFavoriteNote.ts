import { Prisma } from "@prisma/client";
import { noteQuery, serializeNote } from "./serializeNote";

export const favoriteNoteQuery = {
  include: {
    user: {
      select: { publicId: true },
    },
    note: {
      ...noteQuery,
    },
  },
};

export const serializeFavoriteNote = (
  favoriteNote: Prisma.FavoriteGetPayload<typeof favoriteNoteQuery>
) => {
  const { userId, noteId, user, note, createdAt } = favoriteNote;

  return {
    createdAt,
    user: { id: user.publicId },
    note: serializeNote(note),
  };
};
