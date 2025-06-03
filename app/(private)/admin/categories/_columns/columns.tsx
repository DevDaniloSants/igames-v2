"use client";

import TableDropdownMenu from "@/app/(private)/_components/table-dropdown-menu";

import { GetCategoriesDTO } from "@/app/_data-access/category/get-categories";

import { ColumnDef } from "@tanstack/react-table";

import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<GetCategoriesDTO>[] = [
  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: ({ row }) => (
      <div className="w-full px-6">
        <Image
          src={row.original.imageUrl}
          alt={row.original.name}
          width={16}
          height={16}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <Link href={`/posts/${row.original.id}`} className="cursor-pointer">
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "_count",
    header: "Notícias",
    cell: ({ row }) => (
      <div className="flex pl-6">{row.original._count.posts}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const post = {
        title: row.original.name,
        content: row.original.description,
        category: row.original.id,
        imageUrl: row.original.imageUrl,
        id: row.original.id,
      };
      return <TableDropdownMenu post={post} />;
    },
  },
];
