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

import { ReactNode, useState } from "react";
import { Dialog } from "@/app/_components/ui/dialog";

import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

interface TableDropdownMenuProps {
  itemName: "Categoria" | "Notícia";
  onDelete: () => Promise<void>;
  renderEditDialog: (props: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }) => ReactNode;
}

const TableDropdownMenu = ({
  itemName,
  onDelete,
  renderEditDialog,
}: TableDropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditDialog = () => {
    setIsDropdownOpen(false);

    setTimeout(() => {
      setIsEditDialogOpen(true);
    }, 100);
  };

  const handleDeleteDialog = () => {
    setIsDropdownOpen(false);

    setTimeout(() => {
      setIsDeleteDialogOpen(true);
    }, 100);
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <EllipsisIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleEditDialog}>
            <SquarePen className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteDialog}>
            <AlertDialogTrigger className="flex gap-4">
              <Trash2Icon />
              Excluir
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          {renderEditDialog({
            isOpen: isEditDialogOpen,
            setIsOpen: setIsEditDialogOpen,
          })}
        </Dialog>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja mesmo excluir essa {itemName} ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            A {itemName}, será excluído permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete()}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default TableDropdownMenu;
