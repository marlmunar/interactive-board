import { Habit } from "@/types/habit";
import React from "react";

interface HabitInteractionsCounterProps {
  interactionStats: Habit["interactionStats"];
}

const HabitInteractionsCounter = ({
  interactionStats,
}: HabitInteractionsCounterProps) => {
  const { likeCount, followCount, noteCount } = interactionStats;
  const totalInteractions = likeCount + followCount + noteCount;

  return (
    <div>
      {totalInteractions === 0 ? (
        <p>No Interactions</p>
      ) : (
        <>
          <p>
            {likeCount > 0 &&
              `${likeCount} ${likeCount > 1 ? "likes" : "like"}`}
          </p>
          <p>
            {followCount > 0 &&
              `${followCount} ${followCount > 1 ? "follow" : "follow"}`}
          </p>
          <p>
            {noteCount > 0 &&
              `${noteCount} ${noteCount > 1 ? "notes" : "note"}`}
          </p>
          {/* <p>Visitors: Count of Visitors</p> */}
        </>
      )}
    </div>
  );
};

export default HabitInteractionsCounter;
