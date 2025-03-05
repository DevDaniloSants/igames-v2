import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import getPost from "@/app/_data-access/post/get-post";
import getPostComments from "@/app/_data-access/post/get-post-comments";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

import { notFound } from "next/navigation";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const postId = (await params).id;
  if (!postId) {
    return notFound();
  }

  const post = await getPost(postId);
  const comments = await getPostComments(postId);

  return (
    <div className="mt-6 flex w-full flex-col xl:w-[1200px]">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {format(post.createdAt, "dd.mm.yyyy", { locale: ptBR })}
        </span>
        <Badge className="rounded-sm px-1 py-0">{post.category.name}</Badge>
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
      <p className="first-letter:ml-10 first-letter:text-xl">{post.content}</p>
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
      <div className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">
          Comentários ({comments.length})
        </h2>
        <div className="space-y-3">
          {comments.length > 0 ? (
            <>
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2">
                  <Avatar>
                    <AvatarImage src={""} />
                    <AvatarFallback>TD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xs">{comment.user.name}</h4>
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
