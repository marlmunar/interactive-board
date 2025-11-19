import AddNoteForm from "@/components/forms/AddNoteForm";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsAddingNote } from "@/store/slices/ui/habitBoardSlice";
import React from "react";

const VisitorOptions = () => {
  const dispacth = useAppDispatch();
  const isAddingNote = useAppSelector(
    (state) => state.ui.habitBoard.isAddingNote
  );

  return (
    <div className="flex gap-2 p-2">
      <Button variant="outline">Care Button</Button>
      <Button variant="outline">Follow/Notify Me</Button>
      <Button variant="outline" onClick={() => dispacth(setIsAddingNote(true))}>
        Post a Note
      </Button>
      {isAddingNote && <AddNoteForm />}
    </div>
  );
};

export default VisitorOptions;
