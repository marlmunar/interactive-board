"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import HabitInteractions from "./HabitInteractions";
import VisitorOptions from "./VisitorOptions";
import OwnerOptions from "./OwnerOptions";
import { setHabitAuthor, setHabitData } from "@/store/slices/habit/habitSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getHabit } from "@/services/api/habit/getHabit";
import { FetchError } from "@/services/api/runFetch";
import { useSession } from "next-auth/react";
import HabitInteractionsCounter from "./HabitInteractionsCounter";
import { Logger } from "@/components/realtimetest/Logger";
import { Button } from "@/components/ui/button";
import { getChannel } from "@/lib/db/channelRegistry";
import supabase from "@/lib/db/supabase";

const HabitBoard = () => {
  const [view, setView] = useState("visitor");
  const [user, setUser] = useState<{ id: string; username: string }>({
    id: "",
    username: "",
  });
  const dispatch = useAppDispatch();
  const habitAuhor = useAppSelector((state) => state.habit.habitAuthor);
  const router = useRouter();
  const habitData = useAppSelector((state) => state.habit.habitData);

  const { name, description, interactionStats } = habitData;

  const { id: habitId } = useParams();

  useEffect(() => {
    const getHabitData = async () => {
      try {
        const habit = await getHabit(habitId as string);
        dispatch(setHabitData(habit));
        dispatch(setHabitAuthor(habit.author));
      } catch (error) {
        if (error instanceof FetchError && error?.status === 404) {
          router.push("/not-found");
        }
      }
    };

    getHabitData();
  }, [habitId]);

  const { data: session, status } = useSession();

  const channel = getChannel(habitId as string);

  const sendPing = async () => {
    if (!channel) return;
    const result = await channel.send({
      type: "broadcast",
      event: "ping",
      payload: { text: "PING PING" },
    });
    console.log(result);
  };

  useEffect(() => {
    const role = session?.user.id !== habitAuhor.id ? "visitor" : "owner";
    setView(role);
  }, [session, habitAuhor]);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <div className="relative h-screen w-screen  flex flex-col">
      <div className="absolute  z-1 left-1/2 -translate-x-1/2 w-[98%] mx-auto top-2">
        <div className="border bg-gray-50 rounded p-4 w-full z-50 top-2 space-y-1">
          <div>
            <h3 className="h3">{name}</h3>

            <p className="text-xl">{description}</p>
          </div>
          <HabitInteractionsCounter interactionStats={interactionStats} />
        </div>

        <div className="absolute w-max">
          {status === "loading" ? (
            ""
          ) : view === "visitor" ? (
            <VisitorOptions interactionStats={interactionStats} />
          ) : (
            <OwnerOptions />
          )}
          {channel && <Button onClick={sendPing}>PING</Button>}
        </div>
      </div>

      <HabitInteractions />
      <div className="absolute w-104 bottom-0">
        {user.id !== "" && <Logger user={user} habitId={habitId as string} />}
      </div>
    </div>
  );
};

export default HabitBoard;
