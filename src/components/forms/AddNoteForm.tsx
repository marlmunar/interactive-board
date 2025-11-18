"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
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

import { noteSchema } from "@/schemas/note"; // your Zod schema
import { Note } from "../HabitBoard";

const formSchema = noteSchema;

interface AddNoteFormProps {
  setNewNoteData: React.Dispatch<React.SetStateAction<Note>>;
  setIsPlacingNewNote: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddingNote: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNoteForm = ({
  setNewNoteData,
  setIsPlacingNewNote,
  setIsAddingNote,
}: AddNoteFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    form.reset();
    setIsAddingNote(false);

    const newNoteData: Note = {
      id: "newNoteId",
      content: data.content,
      x: 10,
      y: 290,
      author: "newAuthor",
    };
    setNewNoteData(newNoteData);
    setIsPlacingNewNote(true);
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Post a Note</CardTitle>
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
