import React from "react";
import HabitCard from "./HabitCard";
import { HabitMenu } from "./HabitMenu";

const HABITS: {
  name: string;
  description: string;
  progress: string;
  createdAt: Date;
}[] = [
  {
    name: "Habit 1",
    description: "A habit called Habit 1",
    progress: "10%",
    createdAt: new Date(2025, 7, 15),
  },
  {
    name: "Habit 2",
    description: "A habit called Habit 2",
    progress: "30%",
    createdAt: new Date(2025, 8, 16),
  },
  {
    name: "Habit 3",
    description: "A habit called Habit 3",
    progress: "50%",
    createdAt: new Date(2025, 9, 17),
  },
];

const HabitBoard = () => {
  return (
    <div className="px-10 py-2">
      <h3 className="h3">Here are your habits</h3>
      <div className="space-y-2">
        <HabitMenu />
        <div className="grid grid-cols-2 gap-2">
          {HABITS.map((habit) => (
            <HabitCard
              key={habit.name}
              name={habit.name}
              description={habit.description}
              progress={habit.progress}
              createdAt={habit.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitBoard;
