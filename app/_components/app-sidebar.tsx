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

const AppSidebar = () => {
  const isMobile = useIsMobile();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader
        className={`${open || isMobile ? "flex items-center justify-center" : ""} relative p-2 pt-4`}
      >
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={100}
          height={100}
          className="max-h-[32px] max-w-[32px] object-cover"
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
            <SidebarMenu>
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
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
