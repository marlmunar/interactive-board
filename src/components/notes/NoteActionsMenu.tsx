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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            {(noteAuthorId === userId || habitAuthorId === userId) && (
              <>
                <DropdownMenuItem onSelect={startDrag}>Move</DropdownMenuItem>
                <DropdownMenuItem onSelect={requestDelete}>
                  Remove
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NoteActionsMenu;
