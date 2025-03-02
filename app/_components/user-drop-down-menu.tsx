"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Session } from "next-auth";
import { EllipsisIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";

interface UserDropDownMenuProps {
  session: Pick<Session, "user">;
  handleSignOutClick: () => void;
  isMobile: boolean;
  open: boolean;
}

const UserDropDownMenu = ({
  session,
  handleSignOutClick,
  open,
  isMobile,
}: UserDropDownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="rounded-full p-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={session.user.image!} alt={session?.user?.name} />

            <AvatarFallback>{session.user.name[0]}</AvatarFallback>
          </Avatar>
          {open || isMobile ? (
            <>
              <span className="ml-2">{session.user.name}</span>
              <EllipsisIcon className="ml-auto" />
            </>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${open ? "ml-0" : "ml-6"} w-[--radix-popper-anchor-width]`}
      >
        <DropdownMenuItem className="p-2 py-3">
          <UserIcon />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            onClick={handleSignOutClick}
            className="w-full justify-start outline-none"
            variant="ghost"
          >
            <LogOutIcon />
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
