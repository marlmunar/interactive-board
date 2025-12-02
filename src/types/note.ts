export interface Note {
  id: string;
  content: string;
  layout: { x: number; y: number };
  author: {
    username: string;
    id: string;
  };
  habit: {
    id: string;
  };
  interactionStats: {
    isFavorite: boolean;
    isLikedByCurrentUser: boolean;
    likeCount: number;
  };
  updatedAt: string;
}

export const blankNote: Note = {
  id: "",
  content: "",
  layout: { x: NaN, y: NaN },
  author: {
    username: "",
    id: "",
  },
  habit: {
    id: "",
  },
  interactionStats: {
    isFavorite: false,
    isLikedByCurrentUser: false,
    likeCount: 0,
  },
  updatedAt: new Date().toISOString(),
};
