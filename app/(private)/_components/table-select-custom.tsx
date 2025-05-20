"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Role } from "@prisma/client";
import { useState } from "react";

interface TableSelectCustomProps<T extends string> {
  value: T;
  options: T[];
  username?: string;
  title?: string;
  type: "role" | "category";
}

function formatUserRole(role: Role): string {
  const roles = {
    ADMIN: "Administrador",
    USER: "Usuário",
  };

  return roles[role] || role;
}

const TableSelectCustom = <T extends string>({
  value,
  options,
  type,
  username,
  title,
}: TableSelectCustomProps<T>) => {
  const [selectValue, setSelectValue] = useState<T>(value);
  const [pendingValue, setPendingValue] = useState<T | null>(null);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleSelectChange = (newValue: T) => {
    if (newValue === selectValue) return;
    setPendingValue(newValue);
    setIsOpenAlert(true);
  };

  const handleConfirmClick = () => {
    if (!pendingValue) return;
    setSelectValue(pendingValue);
    setPendingValue(null);
    setIsOpenAlert(false);
  };

  const handleCancelClick = () => {
    setPendingValue(null);
    setIsOpenAlert(false);
  };

  return (
    <AlertDialog
      open={isOpenAlert}
      onOpenChange={(open) => !open && handleCancelClick()}
    >
      <Select value={selectValue} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {type === "role" ? formatUserRole(option as Role) : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === "role"
              ? `Tem certeza que deseja alterar o nível de acesso de \"${username}\"?`
              : `Tem certeza que deseja alterar a categoria de ${title}?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso modificará
            {type === "role"
              ? ` o nível de acesso do usuário para ${pendingValue}.`
              : ` a categoria da notícia para ${pendingValue}.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmClick}>
            Salvar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TableSelectCustom;
