import React from "react";

const HabitInteractions = () => {
  return (
    <div className="absolute bg-amber-200 h-full w-full">
      <div className="absolute p-4 top-50 left-6 rounded min-h-64 min-w-64 border bg-white">
        <div className="text-[1.5rem]">You are doing great!</div>
        <div className="text-[1.5rem]">by user#244</div>
        <div>
          <p>Like</p>
          <p>Star</p>
          <p>Remove</p>
          <button>Move</button>
        </div>
      </div>
    </div>
  );
};

export default HabitInteractions;
