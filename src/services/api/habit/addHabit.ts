import { Habit, ReqBodyHabit } from "@/types/habit";
import { runFetch } from "../runFetch";

export const addHabit = async (newHabit: ReqBodyHabit) => {
  const habit = await runFetch<Habit>(`/api/habits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHabit),
  });

  console.log(habit);

  return habit;
};
