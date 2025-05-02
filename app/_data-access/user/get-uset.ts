import { db } from "@/app/_lib/prisma";
import { Role } from "@prisma/client";

export interface IUserDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export const getUsers = async (): Promise<IUserDTO[]> => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return users;
};
