"use client";

import React, { useEffect, useState } from "react";
import HabitCard from "./HabitCard";
import HabitMenu from "./HabitMenu";
import EmptyHabits from "./EmptyHabits";

export interface Habit {
  id: string;
  name: string;
  description: string;
  progress: string;
  createdAt: Date;
}

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  useEffect(() => {
    const fetchHabits = async () => {
      const response = await fetch("/api/habits/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setHabits(data);
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
              <HabitCard
                id={habit.id}
                key={habit.name}
                name={habit.name}
                description={habit.description}
                progress={habit.progress}
                createdAt={habit.createdAt}
              />
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
