import { Habit } from "@/types/habit";
import { runFetch } from "../runFetch";

export const getHabit = async (habitId: string) => {
  const habit = await runFetch<Habit[]>(`/api/habits/${habitId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(habit);
  return habit;
};
