"use client";

import { GetPost } from "@/app/_data-access/post/get-post";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<GetPost>[] = [
  {
    accessorKey: "title",
    header: "Título",
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
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: () => (
      <div className="px-3">
        <EllipsisIcon size={16} />
      </div>
    ),
  },
];
