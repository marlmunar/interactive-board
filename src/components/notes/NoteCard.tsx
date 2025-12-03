"use client";

import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { Button } from "../ui/button";
import NoteAuthorOptions from "./NoteAuthorOptions";
import { Note } from "@/types/note";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import NoteActionsMenu from "./NoteActionsMenu";
import NoteInteractions from "./NoteInteractions";
import { Card } from "../ui/card";

interface NoteParams {
  noteData: Note;
  isActive: boolean;
  activeId: string;
  onSelect: () => void;
  onDragClose: (isToSave: boolean) => void;
}

const NoteCard = ({
  noteData,
  isActive,
  activeId,
  onSelect,
  onDragClose,
}: NoteParams) => {
  const { data: session } = useSession();

  const habitAuthor = useAppSelector((state) => state.habit.habitAuthor);
  const { id, content, layout, author, interactionStats } = noteData;
  const { x, y } = layout;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: !isActive,
    });

  const style = {
    left: x,
    top: y,
    opacity: activeId === "" ? 1 : isActive ? 1 : 0.4,
    zIndex: isActive ? 5 : 0,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const username = session?.user.id === author.id ? "You" : author.username;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="absolute rounded h-full max-h-64 w-64 border bg-white"
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
        <div className="text-[1.5rem]">{content}</div>
        <div className="text-[1rem] flex gap-2 items-center">
          <p>by</p>
          <NoteAuthorOptions username={username} />
        </div>
        <div className="flex items-start flex-col gap-1">
          {!isActive && (
            <>
              <NoteInteractions
                habitAuthorId={habitAuthor.id}
                noteAuthorId={author.id}
                userId={session?.user.id as string}
                noteId={id}
                isPrivate={noteData.isPrivate ? true : false}
                interActionStats={interactionStats}
              />

              <div className="absolute top-2 right-2">
                <NoteActionsMenu
                  noteId={id}
                  noteAuthorId={noteData.author.id}
                  userId={session?.user.id as string}
                  habitAuthorId={habitAuthor.id}
                  startDrag={onSelect}
                />
              </div>
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
    </Card>
  );
};

export default NoteCard;
