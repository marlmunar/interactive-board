export interface Note {
  id: string;
  content: string;
  layout: { x: number; y: number };
  author: string;
}

export const blankNote: Note = {
  id: "",
  content: "",
  layout: { x: NaN, y: NaN },
  author: "",
};
