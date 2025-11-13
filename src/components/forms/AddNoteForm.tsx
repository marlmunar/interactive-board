"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import InputField from "./InputField";

import { useRouter } from "next/navigation";
import { noteSchema } from "@/schemas/note";

const formSchema = noteSchema;

const FORM_TEXT = {
  title: "Post a note",
};

type FormValues = z.infer<typeof formSchema>;

const FIELDS: {
  name: keyof FormValues;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "note",
    label: "Your thoughts",
    type: "text",
    placeholder: "Write your thoughts here",
  },
];

const AddNoteForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="h5">{FORM_TEXT.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="add-note-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-2">
            {FIELDS.map((inputField) => (
              <InputField
                key={inputField.name}
                control={form.control}
                name={inputField.name}
                label={inputField.label}
                type={inputField.type}
                placeholder={inputField.placeholder}
              />
            ))}
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
