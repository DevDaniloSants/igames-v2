import { Role } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
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
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
