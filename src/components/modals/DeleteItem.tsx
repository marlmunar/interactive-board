import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ModalWrapper from "./FormModalWrapper";
import { Button } from "../ui/button";
import { toLowerCase } from "zod";

interface DeleteItemProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  trigger: string;
  resource: {
    type: string;
    name?: string;
    author?: string;
  };
  requestDelete: () => void;
}

const DeleteItem = ({
  open,
  setIsOpen,
  trigger,
  resource,
  requestDelete,
}: DeleteItemProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure to {trigger} this {resource.type}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently {trigger} this{" "}
            {resource.type} and it will be missing forever.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={requestDelete}>
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItem;
