"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { EllipsisIcon, SquarePen, Trash2Icon } from "lucide-react";

import { useState } from "react";
import { Dialog } from "@/app/_components/ui/dialog";
import UpsertPostDialog from "./upsert-post-dialog";

interface TableDropdownMenuProps {
  post: {
    id: string;
    title: string;
    content: string;
    category: string;
    imageUrl: string;
  };
}

const TableDropdownMenu = ({ post }: TableDropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = () => {
    setIsDropdownOpen(false);

    setTimeout(() => {
      setIsEditDialogOpen(true);
    }, 100);
  };
  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <EllipsisIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleEdit}>
            <SquarePen className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2Icon className="mr-2 h-4 w-4" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <UpsertPostDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
            defaultValues={post}
          />
        </Dialog>
      )}
    </>
  );
};

export default TableDropdownMenu;
