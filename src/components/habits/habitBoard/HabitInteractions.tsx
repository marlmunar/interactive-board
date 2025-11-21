import React, { useEffect, useRef, useState } from "react";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import NoteCard from "../../notes/NoteCard";
import { useParams } from "next/navigation";

import { blankNote, Note } from "@/types/note";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setNewNoteData } from "@/store/slices/note/noteSlice";

const HabitInteractions = () => {
  const dispatch = useAppDispatch();
  const isPlacingNewNote = useAppSelector(
    (state) => state.ui.habitBoard.isPlacingNewNote
  );
  const newNoteData: Note = useAppSelector((state) => state.note.newNoteData);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note>(blankNote);
  const [originalNotes, setOriginalNotes] = useState<Note[]>([]);

  const { id: habitId } = useParams();

  useEffect(() => {
    if (isPlacingNewNote) {
      setOriginalNotes(notes);
      setNotes((prev) => [...prev, newNoteData]);
      setActiveNote(newNoteData);
    }
  }, [isPlacingNewNote, newNoteData]);

  const viewerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    const content = contentRef.current;

    if (!viewer || !content) return;

    viewer.scrollLeft = (content.offsetWidth - viewer.offsetWidth) / 2;
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`/api/habits/${habitId}/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNotes(data);
      }
    };

    fetchNotes();
  }, []);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, delta } = e;

    const movedNote = notes.find((note) => note.id === active.id);
    const newNotes = notes.filter((note) => note.id !== active.id);

    if (movedNote) {
      newNotes.push(movedNote);
      setNotes(
        newNotes.map((note) =>
          note.id === active.id
            ? {
                ...note,
                layout: {
                  x: note.layout.x + delta.x,
                  y: note.layout.y + delta.y,
                },
              }
            : note
        )
      );
    }
  };

  const onSelect = (id: string, note: Note) => {
    setOriginalNotes(notes);
    setActiveNote(note);
  };

  const updateNote = async () => {
    const newLayout = notes.find((note) => note.id === activeNote.id)?.layout;
    const response = await fetch(
      `/api/habits/${habitId}/notes/${activeNote.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLayout),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  const addNote = async () => {
    const newLayout = notes.find((note) => note.id === activeNote.id)?.layout;
    const newNote = {
      x: newLayout?.x,
      y: newLayout?.y,
      content: activeNote.content,
    };

    const response = await fetch(`/api/habits/${habitId}/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log(response);
    }

    dispatch(setNewNoteData(blankNote));
  };

  const onDragClose = (isToSave: boolean) => {
    if (!isToSave) {
      setNotes(originalNotes);
    } else {
      if (newNoteData.id === activeNote.id) {
        addNote();
      } else {
        updateNote();
      }
    }
    setActiveNote(blankNote);
  };

  return (
    <div
      ref={viewerRef}
      className="max-h-full max-w-full overflow-auto no-scrollbar"
    >
      <div
        ref={contentRef}
        className="relative bg-amber-200 h-[100rem] w-[100rem] overflow-hidden"
      >
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <div className="h-full w-full snap-center">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                activeId={activeNote.id}
                noteData={note}
                isActive={activeNote.id === note.id}
                onSelect={() => onSelect(note.id, note)}
                onDragClose={(option: boolean) => onDragClose(option)}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default HabitInteractions;
