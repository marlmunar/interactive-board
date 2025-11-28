import { NextResponse } from "next/server";
import { ApiError } from "@/lib/error/apiError";

export function handleError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }

  console.error(error); // unexpected error

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
