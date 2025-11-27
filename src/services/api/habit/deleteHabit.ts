import { Habit } from "@/types/habit";
import { runFetch } from "../runFetch";

export const deleteHabit = async (habitId: string) => {
  const response = await runFetch<Habit>(`/api/habits/${habitId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);
};
