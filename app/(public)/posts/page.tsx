import PostList from "@/app/(public)/_components/post-list";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { getSearchPosts } from "@/app/_data-access/post/get-search-posts";
import Image from "next/image";

const PostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) => {
  const query = await searchParams;

  const posts = await getSearchPosts(query);

  if (posts.length === 0 || !posts) {
    return <div>No posts found</div>;
  }

  return (
    <div className="h-full w-full overflow-hidden xl:max-w-[1200px]">
      <div className="group relative my-5 overflow-hidden rounded-xl md:h-[300px]">
        <Image
          src={"/searchImage.webp"}
          fill
          sizes="100%"
          alt="Search Banner Image object-cover "
        />
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-4">
          <Image
            src={`${posts[0].category.imageUrl}`}
            alt="Category Image"
            width={32}
            height={32}
            priority
          />
          <h1 className="text-3xl font-bold">
            {query.category || query.search}
          </h1>
        </div>
        <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black via-black/60" />
      </div>
      <div className="mb-6 space-y-4">
        <h3 className="text-3xl font-semibold">Pesquisar</h3>
        <div className="flex gap-2">
          <Input placeholder="Pesquisar" className="focus-visible:ring-0" />
          <Button>Pesquisar</Button>
        </div>
      </div>
      <h2 className="mb-6 text-xl text-muted-foreground">Notícias</h2>
      <PostList posts={posts} className="flex h-full w-full flex-col gap-4" />
    </div>
  );
};

export default PostsPage;
