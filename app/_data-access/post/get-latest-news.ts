"use server";

import { db } from "@/app/_lib/prisma";
import { Post } from "@prisma/client";

export const getLatestNews = async (): Promise<Post[]> => {
  const posts = await db.post.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};
