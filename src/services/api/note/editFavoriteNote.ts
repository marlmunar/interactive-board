import { Note } from "@/types/note";
import { runFetch } from "../runFetch";

type Params = {
  habitId: string;
  noteId: string;
};

type Response = {
  createdAt: Date;
  user: { id: string };
  note: Note;
};

export const makeFavoriteNote = async (params: Params) => {
  const { habitId, noteId } = params;

  const response = await runFetch<Response>(
    `/api/habits/${habitId}/notes/${noteId}/favorites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response);

  return response?.note;
};

export const removeFavoriteNote = async (params: Params) => {
  const { habitId, noteId } = params;

  const response = await runFetch<Response>(
    `/api/habits/${habitId}/notes/${noteId}/favorites`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response);

  return response?.note;
};
