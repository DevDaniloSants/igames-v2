import CategoryBadge from "@/app/(public)/_components/category-badge";

import getPost from "@/app/_data-access/post/get-post";
import getPostComments from "@/app/_data-access/post/get-post-comments";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Image from "next/image";

import { notFound } from "next/navigation";

import CommentSection from "../../_components/comment-section";
import { auth } from "@/auth";

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
      <p className="overflow-hidden text-justify first-letter:ml-10 first-letter:text-xl lg:text-left">
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
      <CommentSection postId={postId} comments={comments} session={session} />
    </div>
  );
};

export default PostPage;
