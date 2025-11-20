import * as z from "zod";

export const noteSchema = z.object({
  content: z.string().nonempty("Note content cannot be empty"),
});

export const createNoteSchema = z.object({
  content: z.string().nonempty("Note content cannot be empty"),
  x: z.number(),
  y: z.number(),
});

export const updateNoteSchema = z.object({
  content: z.string().nonempty().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  likes: z.number().min(0).optional(),
  isFavorite: z.boolean().optional(),
});
