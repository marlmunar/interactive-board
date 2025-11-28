import { BadRequestError } from "@/lib/error/apiError";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export const createUser = async ({ username, email, password }: UserData) => {
  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existingUser) {
    throw new BadRequestError("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  return user;
};
