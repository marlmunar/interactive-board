import { Note } from "@/types/note";
import { runFetch } from "../runFetch";

export const getNotes = async (habitId: string) => {
  const notes = await runFetch<Note[]>(`/api/habits/${habitId}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(notes);
  return notes;
};
