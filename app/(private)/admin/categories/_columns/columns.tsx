"use client";

import TableDropdownMenu from "@/app/(private)/_components/table-dropdown-menu";
import UpsertCategoryDialog from "@/app/(private)/_components/upsert-category-dialog";
import { deleteCategory } from "@/app/_actions/category/delete-category";

import { GetCategoriesDTO } from "@/app/_data-access/category/get-categories";

import { ColumnDef } from "@tanstack/react-table";

import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

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
      const category = {
        name: row.original.name,
        description: row.original.description,
        imageUrl: row.original.imageUrl,
        id: row.original.id,
      };

      const handleDeletePost = async () => {
        try {
          await deleteCategory(category.id);
          toast.success("Categoria deletada com sucesso!");
        } catch (error) {
          console.log(error);
          toast.error("Erro ao deletar categoria!");
        }
      };

      return (
        <TableDropdownMenu
          itemName="Categoria"
          onDelete={handleDeletePost}
          key={row.original.id}
          renderEditDialog={(props) => {
            return <UpsertCategoryDialog {...props} defaultValues={category} />;
          }}
        />
      );
    },
  },
];
