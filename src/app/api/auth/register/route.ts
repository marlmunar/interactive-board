import { handleError } from "@/lib/api/error/handleError";
import { validate } from "@/lib/api/data/validate";
import { createUser } from "@/lib/auth/utils/createUser";
import { createUserSchema } from "@/schemas/auth";
import { NextResponse } from "next/server";
import { parseBody } from "@/lib/api/data/parseBody";

export async function POST(req: Request) {
  try {
    const body = await parseBody(req);
    validate(createUserSchema, body, "user");

    const { username, email, password } = body;
    const user = await createUser({ username, email, password });

    return NextResponse.json({
      id: user.publicId,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return handleError(error);
  }
}
