import React, { useEffect, useRef, useState } from "react";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import NoteCard from "../../notes/NoteCard";
import { useParams } from "next/navigation";

import { blankNote, Note } from "@/types/note";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addOneNote,
  removeOneNote,
  setNewNoteData,
  setNotes,
} from "@/store/slices/note/noteSlice";
import { addNote } from "@/services/api/note/addNote";
import { setIsPlacingNewNote } from "@/store/slices/ui/habitBoardSlice";
import { patchNote } from "@/services/api/note/patchNote";
import { getNotes } from "@/services/api/note/getNotes";

const HabitInteractions = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note.notes);
  const isPlacingNewNote = useAppSelector(
    (state) => state.ui.habitBoard.isPlacingNewNote
  );

  const newNoteData: Note = useAppSelector((state) => state.note.newNoteData);

  const [activeNote, setActiveNote] = useState<Note>(blankNote);
  const [originalNotes, setOriginalNotes] = useState<Note[]>([]);

  const { id: habitId } = useParams();

  useEffect(() => {
    if (isPlacingNewNote) {
      setOriginalNotes(notes);
      dispatch(addOneNote(newNoteData));
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
    const requestGetNotes = async () => {
      try {
        const notes = await getNotes(habitId as string);
        dispatch(setNotes(notes));
      } catch (error) {
        console.log(error);
      }
    };

    requestGetNotes();
  }, []);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, delta } = e;

    // const movedNote = notes.find((note) => note.id === active.id);
    // const newNotes = notes.filter((note) => note.id !== active.id);
    // dispatch(removeOneNote(active.id))
    // dispatch(addOneNote(activeNote))
    const newNotes = notes.map((note) =>
      note.id === active.id
        ? {
            ...note,
            layout: {
              x: note.layout.x + delta.x,
              y: note.layout.y + delta.y,
            },
          }
        : note
    );

    dispatch(setNotes(newNotes));
  };

  const onSelect = (note: Note) => {
    setOriginalNotes(notes);
    setActiveNote(note);
  };

  const requestPatchNote = async () => {
    const newLayout = notes.find((note) => note.id === activeNote.id)?.layout;

    try {
      await patchNote({
        updatedNote: { x: newLayout?.x, y: newLayout?.y },
        habitId: habitId as string,
        noteId: activeNote.id as string,
      });
      setActiveNote(blankNote);
    } catch (error) {
      console.log(error);
    }
  };

  const requestAddNote = async () => {
    const newLayout = notes.find((note) => note.id === activeNote.id)?.layout;
    const newNote = {
      x: newLayout ? newLayout.x : 0,
      y: newLayout ? newLayout.y : 0,
      content: activeNote.content,
    };
    try {
      const note = await addNote({ newNote, habitId: habitId as string });
      dispatch(removeOneNote("newNoteId"));
      dispatch(addOneNote(note));
      dispatch(setNewNoteData(blankNote));
      dispatch(setIsPlacingNewNote(false));
      setActiveNote(blankNote);
    } catch (error) {
      return console.error(error);
    }
  };

  const onDragClose = (isToSave: boolean) => {
    if (!isToSave) {
      dispatch(setNotes(originalNotes));
    } else {
      if (newNoteData.id === activeNote.id) {
        requestAddNote();
      } else {
        requestPatchNote();
      }
    }
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
                onSelect={() => onSelect(note)}
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
