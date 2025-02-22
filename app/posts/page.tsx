import PostList from "../_components/post-list";
import { getSearchPosts } from "../_data-access/post/get-search-posts";

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
    <div className="w-full overflow-hidden xl:max-w-[1200px]">
      <PostList posts={posts} className="flex h-full w-full flex-col gap-4" />
    </div>
  );
};

export default PostsPage;
