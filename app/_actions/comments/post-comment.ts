"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export interface IPostComment {
  content: string;
  postId: string;
  userId: string;
}

export const postComment = async (comment: IPostComment) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.comment.create({
    data: {
      content: comment.content,
      postId: comment.postId,
      userId: comment.userId,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath(`posts/${comment.postId}`, "page");
};
