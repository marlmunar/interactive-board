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
import { Field, FieldGroup } from "@/components/ui/field";

import { useAppDispatch } from "@/store/hooks";
import { habitSchema } from "@/schemas/habit";
import { ReqBodyHabit } from "@/types/habit";
import InputField from "./InputField";
import { sortHabits, updateOneHabit } from "@/store/slices/habit/habitSlice";
import { updateHabit } from "@/services/api/habit/updateHabit";

interface EditHabitFormProps {
  closeDialog: () => void;
  habitData: ReqBodyHabit;
  habitId: string;
}

const formSchema = habitSchema;

type FormValues = z.infer<typeof formSchema>;

const FIELDS: {
  name: keyof FormValues;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your Habit's Name",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Describe your new habit",
  },
];

const EditHabitForm = ({
  closeDialog,
  habitData,
  habitId,
}: EditHabitFormProps) => {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: habitData.name, description: habitData.description },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const isUnchanged =
      JSON.stringify(data) === JSON.stringify(form.formState.defaultValues);

    if (isUnchanged) {
      // form.setError("name", {
      //   type: "manual",
      //   message: "Name cannot stay unchanged.",
      // });
      // form.setError("description", {
      //   type: "manual",
      //   message: "Description cannot stay unchanged.",
      // });
      return closeDialog();
    }

    form.reset();
    closeDialog();

    const updatedHabit: ReqBodyHabit = {
      name: data.name,
      description: data.description,
    };

    try {
      const habit = await updateHabit({ habitId, updatedHabit });
      dispatch(updateOneHabit(habit));
      dispatch(sortHabits());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full sm:max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">Edit Habit</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="add-note-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
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
              Save Habit
            </Button>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  );
};

export default EditHabitForm;
