"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId: string) => {
  await db.post.delete({
    where: {
      id: postId,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/", "layout");
};
