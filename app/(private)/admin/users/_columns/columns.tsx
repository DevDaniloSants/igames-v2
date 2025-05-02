"use client";

import { Button } from "@/app/_components/ui/button";
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
    accessorKey: "actions",
    header: "Ações",
  },
];
