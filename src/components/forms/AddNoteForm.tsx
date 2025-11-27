"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import { noteSchema } from "@/schemas/note";

import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { setIsPlacingNewNote } from "@/store/slices/ui/habitBoardSlice";
import { setNewNoteData } from "@/store/slices/note/noteSlice";
import { Note } from "@/types/note";
import { Author, blankAuthor } from "@/types/author";

const formSchema = noteSchema;

interface AddNoteFormProps {
  closeDialog: () => void;
}

const AddNoteForm = ({ closeDialog }: AddNoteFormProps) => {
  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    form.reset();
    closeDialog();

    const newNoteData: Note = {
      id: "newNoteId",
      content: data.content,
      layout: { x: 300, y: 300 },
      author: session ? (session.user as Author) : blankAuthor,
      habit: {
        id: "",
      },
      isFavorite: false,
      updatedAt: new Date().toISOString(),
    };

    dispatch(setNewNoteData(newNoteData));
    dispatch(setIsPlacingNewNote(true));
  };

  return (
    <Card className="w-full sm:max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">Post a Note</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="add-note-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              control={form.control}
              name="content"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="note">Your Note</FieldLabel>
                  <Textarea
                    {...field}
                    id="note"
                    placeholder="Write your thoughts..."
                    rows={5}
                    className="resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <FieldGroup>
          <Field orientation="horizontal" className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="add-note-form">
              Add Note
            </Button>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  );
};

export default AddNoteForm;
