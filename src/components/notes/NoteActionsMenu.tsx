"use client";

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteNote } from "@/services/api/note/deleteNote";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { removeOneNote } from "@/store/slices/note/noteSlice";
import DeleteItem from "../modals/DeleteItem";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import { decNoteCount } from "@/store/slices/habit/habitSlice";

interface NoteActionsMenuProps {
  noteId: string;
  noteAuthorId: string;
  userId: string;
  habitAuthorId: string;
  startDrag: () => void;
}

const NoteActionsMenu = ({
  noteId,
  noteAuthorId,
  userId,
  habitAuthorId,
  startDrag,
}: NoteActionsMenuProps) => {
  const { id: habitId } = useParams();
  const dispatch = useAppDispatch();

  const requestDelete = async () => {
    try {
      await deleteNote({ habitId: habitId as string, noteId });
      dispatch(removeOneNote(noteId));
      dispatch(decNoteCount());
    } catch (error) {
      console.error(error);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" aria-label="Open menu" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            {(noteAuthorId === userId || habitAuthorId === userId) && (
              <>
                <DropdownMenuItem onSelect={startDrag}>Move</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsDeleting(true)}>
                  Unpost
                </DropdownMenuItem>
              </>
            )}
            {noteAuthorId !== userId && (
              <DropdownMenuItem>Report</DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDeleting && (
        <DeleteItem
          trigger="remove"
          open={isDeleting}
          setIsOpen={setIsDeleting}
          resource={{ type: "note" }}
          requestDelete={requestDelete}
        />
      )}
    </>
  );
};

export default NoteActionsMenu;
