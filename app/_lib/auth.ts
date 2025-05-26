import { auth } from "@/auth";
import { db } from "./prisma";
import { Role } from "@prisma/client";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user.email) return null;

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      role: true,
    },
  });

  return user;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === Role.ADMIN;
}
