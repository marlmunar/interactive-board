import * as z from "zod";

export const habitSchema = z.object({
  name: z.string().nonempty("Please give a name to your habit"),
  description: z.string().nonempty("Please describte your habit"),
});

export const createHabitSchema = z.object({
  name: z.string().nonempty("Habit name cannot be empty"),
  description: z.string().nonempty("Habit description cannot be empty"),
});

export const updateHabitSchema = z.object({
  name: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  progresss: z.number().min(0).max(100).optional(),
});
