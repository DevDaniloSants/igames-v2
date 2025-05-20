"use client";

import updateUserRole from "@/app/_actions/user/update-user-role";
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
import { toast } from "react-toastify";

interface TableSelectUserRoleProps {
  id: string;
  value: Role;
  options: Role[];
  username?: string;
}

function formatUserRole(role: Role): string {
  const roles = {
    ADMIN: "Administrador",
    USER: "Usuário",
  };

  return roles[role] || role;
}

const TableSelectUserRole = ({
  id,
  value,
  options,
  username,
}: TableSelectUserRoleProps) => {
  const [selectValue, setSelectValue] = useState<Role>(value);
  const [pendingValue, setPendingValue] = useState<Role | null>(null);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleSelectChange = (newValue: Role) => {
    if (newValue === selectValue) return;
    setPendingValue(newValue);
    setIsOpenAlert(true);
  };

  const handleConfirmClick = async () => {
    if (!pendingValue) return;
    setSelectValue(pendingValue);

    const updatedUser = await updateUserRole({
      userId: id,
      role: pendingValue,
    });

    if (!updatedUser) return toast.error("Erro ao atualizar o usuário");
    toast.success(`O usuário ${username} foi atualizado com sucesso`);

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
              {formatUserRole(option as Role)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Tem certeza que deseja alterar o nível de acesso de \"${username}\"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso modificará
            {` o nível de acesso do usuário para ${pendingValue}.`}
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

export default TableSelectUserRole;
