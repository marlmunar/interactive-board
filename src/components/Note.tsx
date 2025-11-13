import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface NoteParams {
  id: string;
  isActive: boolean;
  onSelect: () => void;
  onDragClose: (isToSave: boolean) => void;
  x: number;
  y: number;
}

const Note = ({ id, x, y, isActive, onSelect, onDragClose }: NoteParams) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: !isActive,
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
      style={style}
      className="absolute rounded h-full max-h-64 min-w-64 border bg-white"
    >
      <div
        className="p-4 h-full"
        style={
          isActive
            ? isDragging
              ? { cursor: "grabbing", opacity: "0.5" }
              : { cursor: "grab" }
            : {}
        }
        {...(isActive ? { ...listeners, ...attributes } : {})}
      >
        <div className="text-[1.5rem]">You are doing great!</div>
        <div className="text-[1rem]">by user#244</div>
        <div className="flex items-start flex-col gap-1">
          {!isActive && (
            <>
              <button>Like</button>
              <button>Star</button>

              {/* If not owner of note: Report Button*/}
              <button>Remove</button>

              <button onClick={() => onSelect()}>Move</button>
            </>
          )}
        </div>
      </div>

      {isActive && (
        <div className="absolute top-66 right-0 space-x-2">
          <Button
            variant="outline"
            className="min-w-20"
            onClick={() => onDragClose(true)}
          >
            Save
          </Button>
          <Button
            variant="outline"
            className="min-w-20"
            onClick={() => onDragClose(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default Note;
