import { runFetch } from "../runFetch";

type Params = {
  habitId: string;
};

export const toggleLikedHabit = async (params: Params) => {
  const { habitId } = params;

  const response = await runFetch(`/api/habits/${habitId}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);
};
