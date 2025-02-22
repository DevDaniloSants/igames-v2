import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export type GetSearchPosts = Prisma.PostGetPayload<{
  include: {
    category: true;
  };
}>;

export const getSearchPosts = async (query: {
  category?: string;
  search?: string;
}): Promise<GetSearchPosts[]> => {
  const posts = await db.post.findMany({
    where: {
      OR: [
        query.category
          ? {
              category: {
                name: {
                  equals: query.category,
                  mode: "insensitive",
                },
              },
            }
          : {},
        query.search
          ? {
              title: {
                contains: query.search,
                mode: "insensitive",
              },
            }
          : {},
      ],
    },
    include: {
      category: true,
    },
  });

  return posts;
};
