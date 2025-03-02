"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

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

import { signIn, signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

import LoginDialog from "./login-dialog";
import UserDropDownMenu from "./user-drop-down-menu";

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
                    <a href={item.href} className="space-x-3">
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
      <SidebarFooter className="px-1">
        {session?.user ? (
          <UserDropDownMenu
            handleSignOutClick={handleSignOutClick}
            session={session}
            isMobile={isMobile}
            open={open}
          />
        ) : (
          <LoginDialog handleSignInClick={handleSignInClick} open={open} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
