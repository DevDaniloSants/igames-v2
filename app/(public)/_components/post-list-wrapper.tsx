import PostList from "./post-list";
import { Post } from "@prisma/client";

type PostFetcher = () => Promise<Post[]>;

interface PostListWrapperProps {
  fetchPosts: PostFetcher;
}

const PostListWrapper = async ({ fetchPosts }: PostListWrapperProps) => {
  const posts = await fetchPosts();
  return (
    <PostList posts={posts} className="flex h-full w-full flex-col gap-4" />
  );
};

export default PostListWrapper;
