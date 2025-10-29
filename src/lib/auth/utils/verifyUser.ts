import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

interface Credentials {
  identifier: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

export const verifyUser = async (credentials: Credentials): Promise<User> => {
  if (!credentials?.identifier || !credentials?.password) {
    throw new Error("Missing username/email or password");
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: credentials.identifier },
        { email: credentials.identifier },
      ],
    },
  });

  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(credentials.password, user.password);
  if (!isValid) throw new Error("Invalid password");

  return {
    id: user.publicId,
    username: user.username,
    email: user.email,
  };
};
