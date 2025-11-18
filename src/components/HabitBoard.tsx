"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import HabitInteractions from "./HabitInteractions";
import { Button } from "./ui/button";
import AddNoteForm from "./forms/AddNoteForm";

interface Habit {
  id: string;
  name: string;
  description: string;
  progress: string;
  createdAt: Date;
}

export interface Note {
  id: string;
  content: string;
  x: number;
  y: number;
  author: string;
}

const HABITS: Habit[] = [
  {
    id: "habit-id-1",
    name: "Habit 1",
    description: "A habit called Habit 1",
    progress: "10%",
    createdAt: new Date(2025, 6, 15),
  },
  {
    id: "habit-id-2",
    name: "Habit 2",
    description: "A habit called Habit 2",
    progress: "30%",
    createdAt: new Date(2025, 7, 16),
  },
  {
    id: "habit-id-3",
    name: "Habit 3",
    description: "A habit called Habit 3",
    progress: "50%",
    createdAt: new Date(2025, 8, 17),
  },
];

const blankHabit: Habit = {
  id: "",
  name: "",
  description: "",
  progress: "",
  createdAt: new Date(),
};

const blankNote: Note = {
  id: "",
  content: "",
  x: NaN,
  y: NaN,
  author: "",
};

const HabitBoard = () => {
  const router = useRouter();
  const [habitData, setHabitData] = useState<Habit>(blankHabit);
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);

  const [newNoteData, setNewNoteData] = useState<Note>(blankNote);
  const [isPlacingNewNote, setIsPlacingNewNote] = useState<boolean>(false);

  const { id: habitId } = useParams();

  useEffect(() => {
    const getHabitData = () => {
      const habit = HABITS.find((habit) => habit.id === habitId);
      console.log(habit);
      if (habit) {
        setHabitData(habit);
      } else {
        router.push("/not-found");
      }
    };

    getHabitData();
  }, [habitId]);

  return (
    <div className="relative h-500">
      <HabitInteractions
        isPlacingNewNote={isPlacingNewNote}
        newNoteData={newNoteData}
      />
      <div className="p-2 w-full sticky top-1">
        <div className="relative">
          <div className="border bg-gray-50 rounded p-6 w-full z-50 top-2 space-y-0.5">
            <h3 className="h3">
              Habit Board: A Dedicated Page for {habitData.name}
            </h3>
            <p>Habit id: {habitData.id}</p>
            <p>{habitData.description}</p>
            <p>Notes: Count of Notes</p>
            <p>Cares: Count of Cares</p>
            <p>Visitors: Count of Visitors</p>
          </div>
        </div>
        {/* If Visitor */}
        <div className="flex gap-2 p-2">
          <Button variant="outline">Care Button</Button>
          <Button variant="outline">Follow/Notify Me</Button>
          <Button
            variant="outline"
            onClick={() => setIsAddingNote((prev) => !prev)}
          >
            Post a Note
          </Button>
          {isAddingNote && (
            <AddNoteForm
              setIsAddingNote={setIsAddingNote}
              setNewNoteData={setNewNoteData}
              setIsPlacingNewNote={setIsPlacingNewNote}
            />
          )}
          {/* On Click: Form pops up for adding a note */}
        </div>
      </div>
    </div>
  );
};

export default HabitBoard;
