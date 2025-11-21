"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import HabitInteractions from "./HabitInteractions";
import VisitorOptions from "./VisitorOptions";
import OwnerOptions from "./OwnerOptions";
import { blankHabit, Habit } from "@/types/habit";
import { setHabitAuthor } from "@/store/slices/habit/habitSlice";
import { useAppDispatch } from "@/store/hooks";

interface HabitBoardProps {
  view: "visitor" | "owner";
}

// const HABITS: Habit[] = [
//   {
//     id: "habit-id-1",
//     name: "Habit 1",
//     description: "A habit called Habit 1",
//     progress: "10%",
//     createdAt: new Date(2025, 6, 15),
//   },
//   {
//     id: "habit-id-2",
//     name: "Habit 2",
//     description: "A habit called Habit 2",
//     progress: "30%",
//     createdAt: new Date(2025, 7, 16),
//   },
//   {
//     id: "habit-id-3",
//     name: "Habit 3",
//     description: "A habit called Habit 3",
//     progress: "50%",
//     createdAt: new Date(2025, 8, 17),
//   },
// ];

const HabitBoard = () => {
  const dispatch = useAppDispatch();
  const view = "visitor";
  const router = useRouter();
  const [habitData, setHabitData] = useState<Habit>(blankHabit);

  const { id: habitId } = useParams();

  useEffect(() => {
    const getHabitData = async () => {
      const response = await fetch(`/api/habits/${habitId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setHabitData(data);
        dispatch(setHabitAuthor(data.author));
      } else {
        router.push("/not-found");
      }
    };

    getHabitData();
  }, [habitId]);

  return (
    <div className="relative h-screen w-screen overflow-auto no-scrollbar bordered-div flex flex-col justify-center items-center">
      {/* <div className="w-full h-full mx-auto">
        <div className="absolute z-2 w-full">
          <div className="border bg-gray-50 rounded p-4 w-full z-50 top-2 space-y-1">
            <div>
              <h3 className="h3">{habitData.name}</h3>

              <p className="text-xl">{habitData.description}</p>
            </div>
            <div>
              <p>Notes: Count of Notes</p>
              <p>Cares: Count of Cares</p>
              <p>Visitors: Count of Visitors</p>
            </div>
          </div>
        </div>

        {view === "visitor" ? <VisitorOptions /> : <OwnerOptions />}
      </div> */}
      {/* <div className="bordered-div w-full">Hello</div> */}

      <HabitInteractions />
    </div>
  );
};

export default HabitBoard;
