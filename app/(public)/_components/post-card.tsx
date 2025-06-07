"use client";

import { CalendarDaysIcon, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

import { motion } from "framer-motion";
import { GetPostsDTO } from "@/app/_data-access/post/get-posts";

interface PostCardProps {
  post: GetPostsDTO;
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1 * 0.25, ease: "easeInOut", duration: 0.5 }}
      viewport={{ amount: 0 }}
    >
      <Link href={`/posts/${post.id}`} className="w-full">
        <div className="group flex cursor-pointer flex-col gap-2 md:flex-row">
          <div className="relative flex h-36 w-full overflow-hidden rounded-lg md:max-h-[135px] md:min-h-[135px] md:min-w-[200px] md:max-w-[200px]">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="100%"
              className="h-full w-full rounded-lg object-cover transition-all duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex w-full flex-col">
            <h1 className="w-11/12 truncate text-lg font-bold group-hover:text-secondary-foreground">
              {post.title}
            </h1>
            <div className="flex w-full gap-2">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon size={16} />
                <span className="text-xs">
                  {format(post.createdAt, "MMM dd, yyyy", { locale: ptBR })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircleMore size={16} />
                <span className="text-xs">
                  {post._count.comments} comentário(s)
                </span>
              </div>
            </div>

            <p className="line-clamp-2 w-full pt-4 text-muted-foreground lg:w-11/12">
              {post.content}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
