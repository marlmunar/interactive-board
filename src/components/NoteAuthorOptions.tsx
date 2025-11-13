"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { Button } from "./ui/button";

const NoteAuthorOptions = ({ username }: { username: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Button className="p-0" variant="link">
          {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <DropdownMenuItem>View Profile</DropdownMenuItem>
        <DropdownMenuItem>Chat</DropdownMenuItem>
        <DropdownMenuItem>Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteAuthorOptions;
