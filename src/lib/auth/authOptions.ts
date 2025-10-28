import type { NextAuthOptions } from "next-auth";
import type { User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "./utils/verifyUser";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (
        credentials: Record<string, string> | undefined
      ): Promise<NextAuthUser | null> => {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        const user = await verifyUser({
          identifier: credentials.identifier,
          password: credentials.password,
        });

        return {
          id: String(user.id),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.name = token.name;
      }
      return session;
    },
  },
};
