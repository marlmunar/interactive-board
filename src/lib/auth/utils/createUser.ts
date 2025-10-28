import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export class UserError extends Error {
  code: number;
  constructor(message: string, code = 400) {
    super(message);
    this.code = code;
    this.name = "UserError";
  }
}

export const createUser = async ({ username, email, password }: UserData) => {
  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existingUser) {
    throw new UserError("User already exists", 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  return user;
};
