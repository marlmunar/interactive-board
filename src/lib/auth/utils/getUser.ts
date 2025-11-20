import { getServerSession } from "next-auth";
import authOptions from "../authOptions";
import { UnauthorizedError } from "@/lib/api/error/apiError";

export const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw new UnauthorizedError("Missing Credentials");

  return session.user.id;
};
