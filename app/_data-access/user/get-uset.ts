import { db } from "@/app/_lib/prisma";
import { Role } from "@prisma/client";

export interface IUserDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  _count: {
    posts: number;
    comments: number;
  };
}

export const getUsers = async (): Promise<IUserDTO[]> => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      _count: {
        select: {
          posts: true,
          comments: true,
        },
      },
    },
  });

  return users;
};
