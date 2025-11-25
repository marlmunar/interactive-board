"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  makeFavoriteNote,
  removeFavoriteNote,
} from "@/services/api/note/editFavoriteNote";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";

import {
  markAsFavorite,
  unmarkAsFavorite,
} from "@/store/slices/note/noteSlice";

interface NoteInteractionsParams {
  habitAuthorId: string;
  userId: string;
  noteId: string;
  isFavorite: boolean;
}

const NoteInteractions = ({
  habitAuthorId,
  userId,
  noteId,
  isFavorite,
}: NoteInteractionsParams) => {
  const { id: habitId } = useParams();
  const dispatch = useAppDispatch();

  const requestMarkAsFavorite = async () => {
    try {
      const note = await makeFavoriteNote({
        habitId: habitId as string,
        noteId,
      });
      dispatch(markAsFavorite(note.id));
    } catch (error) {
      console.error(error);
    }
  };

  const requestUnmarkAsFavorite = async () => {
    try {
      await removeFavoriteNote({
        habitId: habitId as string,
        noteId,
      });
      dispatch(unmarkAsFavorite(noteId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button>Like</button>
      {habitAuthorId === userId ? (
        isFavorite ? (
          <Button variant="secondary" onClick={requestUnmarkAsFavorite}>
            Starred
          </Button>
        ) : (
          <Button variant="secondary" onClick={requestMarkAsFavorite}>
            Star
          </Button>
        )
      ) : (
        <div>{isFavorite && "Starred"}</div>
      )}
    </>
  );
};

export default NoteInteractions;
