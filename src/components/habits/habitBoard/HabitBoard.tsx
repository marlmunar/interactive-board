"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import HabitInteractions from "./HabitInteractions";
import VisitorOptions from "./VisitorOptions";
import OwnerOptions from "./OwnerOptions";
import { blankHabit, Habit } from "@/types/habit";
import { setHabitAuthor } from "@/store/slices/habit/habitSlice";
import { useAppDispatch } from "@/store/hooks";
import { getHabit } from "@/services/api/habit/getHabit";
import { FetchError } from "@/services/api/runFetch";
import { useSession } from "next-auth/react";

const HabitBoard = () => {
  const [view, setView] = useState("visitor");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [habitData, setHabitData] = useState<Habit>(blankHabit);

  const { id: habitId } = useParams();

  useEffect(() => {
    const getHabitData = async () => {
      try {
        const habit = await getHabit(habitId as string);
        setHabitData(habit);
        dispatch(setHabitAuthor(habit.author));
      } catch (error) {
        if (error instanceof FetchError && error?.status === 404) {
          router.push("/not-found");
        }
      }
    };

    getHabitData();
  }, [habitId]);

  const { data: session } = useSession();

  useEffect(() => {
    const role = session?.user.id !== habitData.author.id ? "visitor" : "owner";
    setView(role);
  }, [session]);

  return (
    <div className="relative h-screen w-screen  flex flex-col">
      <div className="absolute  z-1 left-1/2 -translate-x-1/2 w-[98%] mx-auto top-2">
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

        <div className="absolute w-max">
          {view === "visitor" ? <VisitorOptions /> : <OwnerOptions />}
        </div>
      </div>

      <HabitInteractions />
    </div>
  );
};

export default HabitBoard;
