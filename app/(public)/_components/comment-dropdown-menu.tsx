import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { EllipsisIcon, SquarePen, Trash2Icon } from "lucide-react";

interface CommentDropdownMenuProps {
  onEdit: () => void;
}

const CommentDropdownMenu = ({ onEdit }: CommentDropdownMenuProps) => {
  const handleEdit = () => {
    onEdit();
  };

  return (
    <DropdownMenu>
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
          <Trash2Icon />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentDropdownMenu;
