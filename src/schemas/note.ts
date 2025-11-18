import * as z from "zod";

export const noteSchema = z.object({
  content: z.string().nonempty("Note content cannot be empty for adding notes"),
});
