import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export type GetPostComments = Prisma.CommentGetPayload<{
  include: {
    user: true;
  };
}>;

const getPostComments = async (postId: string): Promise<GetPostComments[]> => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  return comments;
};

export default getPostComments;
