"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export interface IUpsertComment {
  content: string;
  postId?: string;
  userId: string;
  commentId?: string;
}

export const upsertComment = async (comment: IUpsertComment) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (comment.commentId) {
    await db.comment.update({
      where: { id: comment.commentId },
      data: { content: comment.content },
    });
  } else {
    if (!comment.postId) {
      throw new Error("Post ID is required for creating a comment");
    }

    await db.comment.create({
      data: {
        content: comment.content,
        postId: comment.postId,
        userId: comment.userId,
      },
    });
  }

  revalidatePath("/", "layout");
  revalidatePath(`posts/${comment.postId}`, "page");
};
