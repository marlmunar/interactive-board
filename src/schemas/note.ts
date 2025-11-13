import * as z from "zod";

export const noteSchema = z.object({
  note: z.string().nonempty("Note content is required"),
});
