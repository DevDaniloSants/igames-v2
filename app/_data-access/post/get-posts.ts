"use server";

import { db } from "@/app/_lib/prisma";
import { Category, Post, User } from "@prisma/client";

export interface GetPostsDTO extends Post {
  category: Category;
  author: User;
  _count: {
    comments: number;
  };
}

const getPosts = async (): Promise<GetPostsDTO[]> => {
  const post = await db.post.findMany({
    include: {
      category: true,
      author: true,
      comments: true,
      _count: {
        select: {
          comments: true,
        },
      },
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
