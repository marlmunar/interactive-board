import { runFetch } from "../runFetch";

type Params = {
  habitId: string;
  noteId: string;
};

export const toggleFavoriteNote = async (params: Params) => {
  const { habitId, noteId } = params;

  const response = await runFetch(
    `/api/habits/${habitId}/notes/${noteId}/favorites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response);
};
