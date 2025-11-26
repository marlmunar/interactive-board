import AddNoteForm from "@/components/forms/AddNoteForm";
import ModalWrapper from "@/components/modals/ModalWrapper";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsAddingNote } from "@/store/slices/ui/habitBoardSlice";
import React, { useRef } from "react";

const VisitorOptions = () => {
  const dispacth = useAppDispatch();
  const isAddingNote = useAppSelector(
    (state) => state.ui.habitBoard.isAddingNote
  );
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex gap-2 p-2">
      <Button variant="outline">Care Button</Button>
      <Button variant="outline">Follow/Notify Me</Button>
      <ModalWrapper trigger="Post a Note" title="Add a note">
        {(closeDialog) => <AddNoteForm closeDialog={closeDialog} />}
      </ModalWrapper>
    </div>
  );
};

export default VisitorOptions;
