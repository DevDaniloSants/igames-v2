import { ListIcon, NewspaperIcon, UsersIcon } from "lucide-react";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { MdHome, MdDesktopMac } from "react-icons/md";

export const SIDEBAR_ADMIN_ITEMS = [
  {
    id: 6,
    title: "Notícias",
    href: "/admin/posts",
    icon: NewspaperIcon,
  },
  {
    id: 7,
    title: "Usuários",
    href: "/",
    icon: UsersIcon,
  },
  {
    id: 8,
    title: "Categorias",
    href: "/",
    icon: ListIcon,
  },
];

export const SIDEBAR_ITEMS = [
  {
    id: 1,
    title: "Home",
    href: "/",
    icon: MdHome,
  },
  {
    id: 2,
    title: "Playstation",
    href: "/posts?category=Playstation",
    icon: FaPlaystation,
  },
  {
    id: 3,
    title: "Xbox",
    href: "/posts?category=Xbox",
    icon: FaXbox,
  },
  {
    id: 4,
    title: "Nintendo Switch",
    href: "/posts?category=Nintendo",
    icon: BsNintendoSwitch,
  },
  {
    id: 5,
    title: "PC",
    href: "/posts?category=PC",
    icon: MdDesktopMac,
  },
];
