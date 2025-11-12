import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";

interface NoteParams {
  id: string;
  x: number;
  y: number;
}

const Note = ({ id, x, y }: NoteParams) => {
  const [isMoving, setIsMoving] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    left: x,
    top: y,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={isMoving ? setNodeRef : null}
      {...listeners}
      {...attributes}
      style={style}
      className="absolute p-4 rounded min-h-64 min-w-64 border bg-white"
    >
      <div className="text-[1.5rem]">You are doing great!</div>
      <div className="text-[1rem]">by user#244</div>
      <div>
        <p>Like</p>
        <p>Star</p>
        <p>Remove</p>
        <button>Move</button>
      </div>
    </div>
  );
};

export default Note;
