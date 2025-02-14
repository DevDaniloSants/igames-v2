import { db } from "@/app/_lib/prisma";
import { Post } from "@prisma/client";

type GetPostsSkipLatest = Post[];

export const GetPostsSkipLatest = async (): Promise<GetPostsSkipLatest> => {
  return await db.post.findMany({
    skip: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
};
