import { Habit, ReqBodyHabit } from "@/types/habit";
import { runFetch } from "../runFetch";

interface Params {
  habitId: string;
  updatedHabit: ReqBodyHabit;
}

export const updateHabit = async (params: Params) => {
  const { habitId, updatedHabit } = params;
  const habit = await runFetch<Habit>(`/api/habits/${habitId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedHabit),
  });

  console.log(habit);
  return habit;
};
