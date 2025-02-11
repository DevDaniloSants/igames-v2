import Image from "next/image";
import AppSidebar from "./app-sidebar";
import { SidebarTrigger } from "./ui/sidebar";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <header>
      <div className="flex w-full items-center justify-between bg-sidebar p-3 md:hidden">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={100}
          height={100}
          className="max-h-[32px] max-w-[32px] object-cover"
        />
        <SidebarTrigger>
          <MenuIcon />
        </SidebarTrigger>
      </div>
      <AppSidebar />
    </header>
  );
};

export default Header;
