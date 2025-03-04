import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./app/_lib/prisma";
import { Role } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      profile(profile) {
        return {
          role: profile.role ?? Role.USER,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          id: profile.sub,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? Role.USER;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as Role;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
