import { Post } from "@prisma/client";
import { CalendarDaysIcon, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="group flex w-full cursor-pointer flex-col gap-2 md:flex-row">
      <div className="relative flex h-36 w-full overflow-hidden rounded-lg md:h-[135px] md:w-[200px]">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="h-full w-full rounded-lg object-cover transition-all duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="w-[90%] truncate text-lg font-bold group-hover:text-secondary-foreground">
          {post.title}
        </h1>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon size={16} />
            <span className="text-xs">
              {format(post.createdAt, "MMM dd, yyyy", { locale: ptBR })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircleMore size={16} />
            <span className="text-xs">0 comentários</span>
          </div>
        </div>
        <p className="w-[90%] truncate pt-4">{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;
