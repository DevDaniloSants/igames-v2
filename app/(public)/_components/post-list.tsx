import PostCard from "./post-card";
import { GetPostDTO } from "@/app/_data-access/post/get-posts-test";

interface PostListProps {
  posts: GetPostDTO[];
  className?: string;
}

const PostList = ({ posts, className }: PostListProps) => {
  return (
    <div className={`${className} `}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
