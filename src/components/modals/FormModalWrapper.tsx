import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddNoteForm from "../forms/AddNoteForm";
import {
  cloneElement,
  ReactElement,
  ReactHTMLElement,
  ReactNode,
  useState,
} from "react";

interface FormModalWrapperProps {
  title: string;
  description: string;
  trigger: string;
  children: (closeDialog: () => void) => ReactNode;
}

const FormModalWrapper = ({
  title,
  description,
  trigger,
  children,
}: FormModalWrapperProps) => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{trigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogTitle className="hidden">{title}</DialogTitle>
        <DialogDescription className="hidden">{description}</DialogDescription>
        {children(closeDialog)}
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default FormModalWrapper;
