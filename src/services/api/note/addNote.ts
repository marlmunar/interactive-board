import { Note } from "@/types/note";
import { runFetch } from "../runFetch";

type Params = {
  newNote: {
    x: number;
    y: number;
    content: string;
  };
  habitId: string;
};

export const addNote = async (params: Params) => {
  const { newNote, habitId } = params;

  const note = await runFetch<Note>(`/api/habits/${habitId}/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });

  console.log(note);

  return note;
};
