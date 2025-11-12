import React, { useState } from "react";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Note from "./Note";

type Note = {
  id: string;
  x: number;
  y: number;
};

const initialNotes: Note[] = [
  { id: "note1", x: 100, y: 150 },
  { id: "note2", x: 250, y: 100 },
];

const HabitInteractions = () => {
  const [notes, setNotes] = useState(initialNotes);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, delta } = e;

    const activeNote = notes.find((note) => note.id === active.id);
    const newNotes = notes.filter((note) => note.id !== active.id);

    if (activeNote) {
      newNotes.push(activeNote);
      setNotes(
        newNotes.map((note) =>
          note.id === active.id
            ? {
                ...note,
                x: note.x + delta.x,
                y: note.y + delta.y,
              }
            : note
        )
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="absolute bg-amber-200 h-full w-full">
        {notes.map((note) => (
          <Note key={note.id} id={note.id} x={note.x} y={note.y} />
        ))}
      </div>
    </DndContext>
  );
};

export default HabitInteractions;
