"use client";

import TableSelectCustom from "@/app/(private)/_components/table-select-custom";
import { Button } from "@/app/_components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

import { IUserDTO } from "@/app/_data-access/user/get-user";
import { Role } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
    cell: function Cell({ row }) {
      return (
        <TableSelectCustom
          value={row.original.role}
          options={Object.values(Role)}
          type="role"
          username={row.original.name}
        />
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
