"use server";

import { db } from "@/app/_lib/prisma";
import { Category } from "@prisma/client";

export const getCategories = async (): Promise<Category[]> => {
  const categories = await db.category.findMany({});
  return categories;
};
