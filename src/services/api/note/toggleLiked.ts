import { runFetch } from "../runFetch";

type Params = {
  habitId: string;
  noteId: string;
};

export const toggleLikedNote = async (params: Params) => {
  const { habitId, noteId } = params;

  const response = await runFetch(
    `/api/habits/${habitId}/notes/${noteId}/likes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response);
};
