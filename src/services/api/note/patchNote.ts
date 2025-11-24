import { Note } from "@/types/note";
import { runFetch } from "../runFetch";

type Params = {
  updatedNote: { x?: number; y?: number; content?: string };
  habitId: string;
  noteId: string;
};

export const patchNote = async (params: Params) => {
  const { updatedNote, habitId, noteId } = params;

  const note = await runFetch<Note>(`/api/habits/${habitId}/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });

  console.log(note);

  return note;
};
