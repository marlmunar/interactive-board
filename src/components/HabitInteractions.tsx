import React, { useState } from "react";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
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
  const [activeNoteId, setActiveNoteId] = useState<string>("");
  const [originalNotes, setOriginalNotes] = useState<Note[]>([]);

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

  const onSelect = (id: string) => {
    setOriginalNotes(notes);
    setActiveNoteId(id);
  };

  const onDragClose = (isToSave: boolean) => {
    setActiveNoteId("");

    if (!isToSave) {
      setNotes(originalNotes);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
      <div className="absolute bg-amber-200 h-full w-full">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            x={note.x}
            y={note.y}
            isActive={activeNoteId === note.id}
            onSelect={() => onSelect(note.id)}
            onDragClose={(option: boolean) => onDragClose(option)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default HabitInteractions;
