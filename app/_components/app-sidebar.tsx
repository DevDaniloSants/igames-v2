"use client";

import { ChevronLeft, ChevronRight, UserIcon } from "lucide-react";

import { useIsMobile } from "../_hooks/use-mobile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import Image from "next/image";
import { SIDEBAR_ITEMS } from "../_constants/sidebar-items";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { BsGoogle } from "react-icons/bs";
import { signIn, signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

const AppSidebar = () => {
  const isMobile = useIsMobile();
  const { open } = useSidebar();
  const { data: session } = useSession();

  const handleSignInClick = async () => {
    await signIn("google");
  };

  const handleSignOutClick = async () => {
    await signOut();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="relative p-2 pt-4">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={100}
          height={100}
          className={`max-h-[32px] max-w-[32px] transform object-cover transition-all duration-300 ${
            open || isMobile ? "translate-x-28" : "-translate-x-0"
          }`}
        />

        {!isMobile && (
          <SidebarTrigger className="absolute -right-[10px] top-10 h-5 w-5 rounded-full bg-sidebar-accent">
            {open ? <ChevronLeft /> : <ChevronRight />}
          </SidebarTrigger>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <hr />
        <p>{session?.user?.name}</p>
        <p>{session?.user.role}</p>
        <p>teste</p>
        {session?.user ? (
          <Button
            className={`${open || isMobile ? "w-full rounded-md p-2" : "h-7 w-7 rounded-full p-0"} transition-[width] duration-200`}
            onClick={handleSignOutClick}
          >
            SignOut
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className={`${open || isMobile ? "w-full rounded-md p-2" : "h-7 w-7 rounded-full p-0"} transition-[width] duration-200`}
              >
                <UserIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95%] md:w-full">
              <DialogHeader className="flex items-center">
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta do Google
                </DialogDescription>
              </DialogHeader>
              <div>
                <Button
                  className="w-full font-bold"
                  onClick={handleSignInClick}
                >
                  <BsGoogle />
                  Google
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
