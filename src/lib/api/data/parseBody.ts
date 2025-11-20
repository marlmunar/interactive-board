import { BadRequestError } from "../error/apiError";

export const parseBody = async (req: Request) => {
  try {
    const parsed = await req.json();

    return parsed;
  } catch (error) {
    throw new BadRequestError("Invalid request body");
  }
};
