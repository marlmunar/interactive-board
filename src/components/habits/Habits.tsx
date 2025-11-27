"use client";

import React, { useEffect, useState } from "react";
import HabitCard from "./HabitCard";
import HabitMenu from "./HabitMenu";
import EmptyHabits from "./EmptyHabits";
import { Habit } from "@/types/habit";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setHabits } from "@/store/slices/habit/habitSlice";
import { getHabits } from "@/services/api/habit/getHabits";

const Habits = () => {
  // const [habits, setHabits] = useState<Habit[]>([]);

  const dispatch = useAppDispatch();
  const habits = useAppSelector((state) => state.habit.habits);
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const habits = await getHabits();
        dispatch(setHabits(habits));
      } catch (error) {
        console.log(error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div className="px-10 py-2">
      <h3 className="h3">Here are your habits</h3>
      <div className="space-y-2">
        <HabitMenu />
        {habits.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habitData={habit} />
            ))}{" "}
          </div>
        ) : (
          <EmptyHabits />
        )}
      </div>
    </div>
  );
};

export default Habits;
