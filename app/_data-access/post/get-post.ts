import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export type GetPost = Prisma.PostGetPayload<{
  include: {
    category: true;
    author: true;
  };
}>;

const getPost = async (id: string): Promise<GetPost> => {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      author: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export default getPost;
