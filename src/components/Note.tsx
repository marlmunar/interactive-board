import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface NoteParams {
  id: string;
  x: number;
  y: number;
}

const Note = ({ id, x, y }: NoteParams) => {
  const [isMoving, setIsMoving] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: !isMoving,
  });

  const style = {
    left: x,
    top: y,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="absolute p-4 rounded min-h-64 min-w-64 border bg-white"
    >
      <div className="text-[1.5rem]">You are doing great!</div>
      <div className="text-[1rem]">by user#244</div>
      <div className="flex items-start flex-col gap-1">
        {!isMoving && (
          <>
            <button>Like</button>
            <button>Star</button>
            <button>Remove</button>
            <button onClick={() => setIsMoving(true)}>Move</button>
          </>
        )}
      </div>
      {isMoving && (
        <div className="absolute top-66 right-0 space-x-2">
          <Button variant="outline" onClick={() => setIsMoving(false)}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default Note;
