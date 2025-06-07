import { GetPostsDTO } from "@/app/_data-access/post/get-posts";
import PostList from "./post-list";

type PostFetcher = () => Promise<GetPostsDTO[]>;

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
