import CategoryBadge from "@/app/(public)/_components/category-badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

import getPost from "@/app/_data-access/post/get-post";
import getPostComments from "@/app/_data-access/post/get-post-comments";
import { auth } from "@/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

import { notFound } from "next/navigation";
import CommentForm from "../../_components/comment-form";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const postId = (await params).id;
  if (!postId) {
    return notFound();
  }

  const session = await auth();

  const post = await getPost(postId);
  const comments = await getPostComments(postId);

  return (
    <div className="mt-6 flex w-full flex-col xl:w-[1200px]">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {format(post.createdAt, "dd.mm.yyyy", { locale: ptBR })}
        </span>
        <CategoryBadge name={post.category.name} />
      </div>
      <h1 className="mb-2 text-xl font-semibold text-secondary-foreground lg:text-4xl">
        {post.title}
      </h1>
      <div className="relative mb-4 h-[550px] min-h-[300px] w-full">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="100%"
          priority
          className="object-cover"
        />
      </div>
      <p className="overflow-hidden first-letter:ml-10 first-letter:text-xl">
        {post.content}
      </p>
      <div className="mt-6 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted-foreground">Por:</span>
          <h3 className="text-sm font-bold text-secondary-foreground">
            {post.author.name}
          </h3>
        </div>
        <span className="text-xs font-thin text-muted-foreground">
          {post.author.email}
        </span>
      </div>
      {session?.user && (
        <div className="flex w-full gap-2 py-4">
          <div>
            {session.user.image ? (
              <Avatar>
                <AvatarImage src={session.user.image} />
                <AvatarFallback>
                  <Loader2Icon className="animate-spin" />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>TD</AvatarFallback>
              </Avatar>
            )}
          </div>
          <CommentForm postId={postId} userId={session.user.id} />
        </div>
      )}
      <div className="mt-6">
        <h2 className="mb-6 text-lg font-semibold">
          Comentários ({comments.length})
        </h2>
        <div className="space-y-6">
          {comments.length > 0 ? (
            <>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="group flex items-start gap-2 rounded-sm p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-muted/50"
                >
                  <Avatar>
                    <AvatarImage src={comment.user.image || ""} />
                    <AvatarFallback>TD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xs transition-colors duration-300 group-hover:text-secondary-foreground">
                      {comment.user.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum comentário.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
