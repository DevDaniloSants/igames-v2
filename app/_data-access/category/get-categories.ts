"use server";

import { db } from "@/app/_lib/prisma";
import { Category } from "@prisma/client";

export interface GetCategoriesDTO extends Category {
  _count: {
    posts: number;
  };
}

export const getCategories = async (): Promise<GetCategoriesDTO[]> => {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      description: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
  return categories;
};
