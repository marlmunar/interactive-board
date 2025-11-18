import React, { useEffect, useState } from "react";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import Note from "./Note";

type Note = {
  id: string;
  content: string;
  x: number;
  y: number;
  author: string;
};

interface HabitInteractionsProps {
  isPlacingNewNote: boolean;
  newNoteData: Note;
}

const initialNotes: Note[] = [
  { id: "note1", content: "just a note", x: 100, y: 150, author: "user125" },
  {
    id: "note2",
    content: "just another note",
    x: 200,
    y: 150,
    author: "user124",
  },
];

const HabitInteractions = ({
  isPlacingNewNote,
  newNoteData,
}: HabitInteractionsProps) => {
  const [notes, setNotes] = useState(initialNotes);
  const [activeNoteId, setActiveNoteId] = useState<string>("");
  const [originalNotes, setOriginalNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (newNoteData.id) {
      setOriginalNotes(notes);
      setNotes((prev) => [...prev, newNoteData]);
      setActiveNoteId(newNoteData.id);
    }
  }, [isPlacingNewNote, newNoteData]);

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
            noteData={note}
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
