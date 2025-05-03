"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { IUserDTO } from "@/app/_data-access/user/get-uset";
import { Role } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

function formatUserRole(role: Role): string {
  const roles = {
    ADMIN: "Administrador",
    USER: "Usuário",
  };

  return roles[role] || role;
}

export const columns: ColumnDef<IUserDTO>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nível de acesso
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center gap-2 pl-4">
          {formatUserRole(row.original.role)}
        </div>
      );
    },
  },
  {
    accessorKey: "_count.posts",
    header: "Notícias",
    cell: ({ row }) => {
      const isAdmin = row.original.role === Role.ADMIN;
      return (
        <div>
          {isAdmin ? (
            <p>{row.original._count.posts}</p>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>-</TooltipTrigger>
                <TooltipContent>
                  <p>Usuários não tem permissão para postar notícias</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "_count.comments",
    header: "Comentários",
  },
];
