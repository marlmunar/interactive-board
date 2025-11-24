import prisma from "@/lib/db/prisma";

export const getNoteKey = async (noteId: string) => {
  console.log(noteId);
  console.log("code is here");
  const noteData = await prisma.note.findFirst({
    where: { publicId: noteId },
  });

  console.log(noteData);

  return noteData?.id;
};
