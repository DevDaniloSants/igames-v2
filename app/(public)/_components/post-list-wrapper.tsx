import { GetPostsSkipLatest } from "@/app/_data-access/post/get-posts-skip-latest";
import PostList from "./post-list";

const PostListWrapper = async () => {
  const postsSkipLatest = await GetPostsSkipLatest();
  return (
    <PostList
      posts={postsSkipLatest}
      className="flex h-full w-full flex-col gap-4"
    />
  );
};

export default PostListWrapper;
