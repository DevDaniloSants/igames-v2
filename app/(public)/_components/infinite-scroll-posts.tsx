import LoadMore from "./load-more";
import PostList from "./post-list";

const InfiniteScrollPosts = async () => {
  const page = 1;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=A&page=${page}`;

  const posts = await fetch(url).then((res) => res.json());

  return (
    <div className="space-y-4">
      <PostList posts={posts} className="flex h-full w-full flex-col gap-4" />
      <LoadMore />
    </div>
  );
};

export default InfiniteScrollPosts;
