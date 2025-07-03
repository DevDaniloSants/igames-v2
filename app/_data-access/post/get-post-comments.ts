import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export type IGetPostCommentsDTO = Prisma.CommentGetPayload<{
  include: {
    user: true;
  };
}>;

const getPostComments = async (
  postId: string,
): Promise<IGetPostCommentsDTO[]> => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments;
};

export default getPostComments;
