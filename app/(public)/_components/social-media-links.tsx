"use client";

import { Button } from "@/app/_components/ui/button";
import {
  BsInstagram,
  BsYoutube,
  BsDiscord,
  BsFacebook,
  BsTwitterX,
} from "react-icons/bs";

const SocialMediaLinks = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button className="dark:shadow-lgdark:focus:ring-pink-800 rounded-lg bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-pink-300">
        <BsInstagram />
        Instagram
      </Button>
      <Button className="rounded-lg bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300">
        <BsYoutube />
        YouTube
      </Button>
      <Button className="rounded-lg bg-gradient-to-r from-indigo-900 via-indigo-600 to-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800">
        <BsDiscord />
        Discord
      </Button>
      <Button className="rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
        <BsFacebook />
        Facebook
      </Button>
      <Button className="rounded-lg bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-zinc-300 dark:focus:ring-zinc-800">
        <BsTwitterX />
        Twitter
      </Button>
    </div>
  );
};

export default SocialMediaLinks;
