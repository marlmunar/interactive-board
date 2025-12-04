import { Habit } from "@/types/habit";
import { runFetch } from "../runFetch";

export const getHabits = async () => {
  const habits = await runFetch<Habit[]>(`/api/habits/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log(habits);
  return habits;
};
