"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export type GetPosts = Prisma.PostGetPayload<{
  include: {
    category: true;
    author: true;
  };
}>;

const getPosts = async (): Promise<GetPosts[]> => {
  const post = await db.post.findMany({
    include: {
      category: true,
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export default getPosts;
