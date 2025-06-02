import { getSearchPosts } from "@/app/_data-access/post/get-search-posts";
import Image from "next/image";
import { Suspense } from "react";
import PostListWrapper from "../_components/post-list-wrapper";
import { PostListSkeleton } from "../_components/skeletons";
import SearchForm from "../_components/search-form";

const PostsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) => {
  const query = await searchParams;

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
          <h1 className="text-3xl font-bold">
            {query.category || query.search}
          </h1>
        </div>
        <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black via-black/60" />
      </div>
      <div className="mb-6 space-y-4">
        <h3 className="text-3xl font-semibold">Pesquisar</h3>
        <SearchForm />
      </div>
      <h2 className="mb-6 text-xl text-muted-foreground">Notícias</h2>
      <Suspense fallback={<PostListSkeleton />}>
        <PostListWrapper fetchPosts={() => getSearchPosts(query)} />
      </Suspense>
    </div>
  );
};

export default PostsPage;
