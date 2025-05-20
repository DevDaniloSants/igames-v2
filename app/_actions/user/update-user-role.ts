"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

const updateUserRole = async ({
  userId,
  role,
}: {
  userId: string;
  role: Role;
}) => {
  const session = await auth();

  if (!session) return;

  if (session.user.role !== Role.ADMIN || !session) return;

  const updatedUser = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });

  revalidatePath("/admin/users");
  revalidatePath("/", "layout");

  return updatedUser;
};

export default updateUserRole;
