"use client";

import React from "react";
import { Button } from "../ui/button";
import { toggleFavoriteNote } from "@/services/api/note/toggleFavorite";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";

import { toggleIsFavorite, toggleIsLiked } from "@/store/slices/note/noteSlice";
import { toggleLikedNote } from "@/services/api/note/toggleLiked";
import { Note } from "@/types/note";

interface NoteInteractionsParams {
  habitAuthorId: string;
  noteAuthorId: string;
  userId: string;
  noteId: string;
  interActionStats: Note["interactionStats"];
  isPrivate: boolean;
}

const NoteInteractions = ({
  habitAuthorId,
  noteAuthorId,
  userId,
  noteId,
  interActionStats,
  isPrivate,
}: NoteInteractionsParams) => {
  const { id: habitId } = useParams();

  const {
    isFavorite,
    isLikedByCurrentUser: isLiked,
    likeCount,
  } = interActionStats;
  const dispatch = useAppDispatch();
  console.log(isFavorite);

  const requestToggleFavorite = async () => {
    try {
      await toggleFavoriteNote({
        habitId: habitId as string,
        noteId,
      });

      dispatch(toggleIsFavorite(noteId));
    } catch (error) {
      console.error(error);
    }
  };

  const requestToggleLiked = async () => {
    try {
      await toggleLikedNote({
        habitId: habitId as string,
        noteId,
      });

      dispatch(toggleIsLiked(noteId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {likeCount > 0 && (
        <div className="text-sm">
          {`${likeCount} ${likeCount > 1 ? "likes" : "like"}`}
        </div>
      )}
      {isFavorite && habitAuthorId !== userId && (
        <div className="text-sm">Starred by Habit Owner</div>
      )}
      {isPrivate && <div className="text-sm">Private Note</div>}
      {noteAuthorId !== userId && (
        <div className="flex justify-between gap-1">
          <Button variant="secondary" onClick={requestToggleLiked}>
            {isLiked ? "Liked" : "Like"}
          </Button>
          {habitAuthorId === userId && (
            <Button variant="secondary" onClick={requestToggleFavorite}>
              {isFavorite ? "Starred" : "Star"}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default NoteInteractions;
