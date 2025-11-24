import { runFetch } from "../runFetch";

type Params = {
  habitId: String;
  noteId: String;
};

export const deleteNote = async (params: Params) => {
  const { habitId, noteId } = params;

  const response = await runFetch<String>(
    `/api/habits/${habitId}/notes/${noteId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response);

  return response;
};
