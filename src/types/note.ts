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
  isFavorite: boolean;
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
  isFavorite: false,
  updatedAt: new Date().toISOString(),
};
