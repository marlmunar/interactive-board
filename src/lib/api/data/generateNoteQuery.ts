export const generateNoteQuery = (userId: string) => {
  const noteQuery = {
    include: {
      user: {
        select: { username: true, publicId: true },
      },
      habit: {
        select: { publicId: true },
      },
      favorites: {
        where: { userId },
        select: { commentId: true },
      },
    },
  };

  return noteQuery;
};
