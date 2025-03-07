import { Post } from "@prisma/client";
import PostCard from "./post-card";

interface PostListProps {
  posts: Post[];
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
