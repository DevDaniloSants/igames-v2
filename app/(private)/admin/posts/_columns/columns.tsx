"use client";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { GetPost } from "@/app/_data-access/post/get-post";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<GetPost>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => (
      <Link href={`/posts/${row.original.id}`} className="cursor-pointer">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "author",
    header: "Autor",
    cell: ({ row }) => <p>{row.original.author.name}</p>,
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <div className="w-full px-6">
        <Image
          src={row.original.category.imageUrl}
          alt={row.original.category.name}
          width={16}
          height={16}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisIcon size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
