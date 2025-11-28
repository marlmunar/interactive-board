import { ZodType } from "zod";
import { BadRequestError } from "@/lib/error/apiError";

export function validate<T>(
  schema: ZodType<T>,
  data: unknown,
  dataType: string
): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new BadRequestError(`Invalid or incomplete data for ${dataType}`);
  }
  return parsed.data;
}
