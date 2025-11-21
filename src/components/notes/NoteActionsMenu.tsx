"use client";

import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NoteActionsMenuProps {
  noteAuthorId: string;
  userId: string;
  habitAuthorId: string;
  startDrag: () => void;
}

const NoteActionsMenu = ({
  noteAuthorId,
  userId,
  habitAuthorId,
  startDrag,
}: NoteActionsMenuProps) => {
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
                <DropdownMenuItem>Remove</DropdownMenuItem>
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
