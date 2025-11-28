import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";
import { UnauthorizedError } from "@/lib/error/apiError";

export const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw new UnauthorizedError("Missing Credentials");

  return session.user.id;
};
