import NextAuth from "next-auth";

import { db } from "./app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  ...authConfig,
});
