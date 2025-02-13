import { BsNintendoSwitch } from "react-icons/bs";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { MdHome, MdDesktopMac } from "react-icons/md";

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
    href: "/",
    icon: FaPlaystation,
  },
  {
    id: 3,
    title: "Xbox",
    href: "/",
    icon: FaXbox,
  },
  {
    id: 4,
    title: "Nintendo",
    href: "/",
    icon: BsNintendoSwitch,
  },
  {
    id: 5,
    title: "PC",
    href: "/",
    icon: MdDesktopMac,
  },
];
