import { createUser, UserError } from "@/lib/auth/utils/createUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await createUser({ username, email, password });

    return NextResponse.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error: unknown) {
    if (error instanceof UserError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code }
      );
    }

    console.error("Unexpected error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
