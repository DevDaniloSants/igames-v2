"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (categoryId: string) => {
  await db.category.delete({
    where: {
      id: categoryId,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/", "layout");
};
