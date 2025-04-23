"use client";

import TableDropdownMenu from "@/app/(private)/_components/table-dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import { GetPost } from "@/app/_data-access/post/get-post";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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
    cell: ({ row }) => {
      const post = {
        title: row.original.title,
        content: row.original.content,
        category: row.original.category.id,
      };
      return (
        <TableDropdownMenu
          imageUrl={row.original.imageUrl}
          postId={row.original.id}
          post={post}
        />
      );
    },
  },
];
