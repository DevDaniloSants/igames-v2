import { GetPostsDTO } from "@/app/_data-access/post/get-posts";
import PostCard from "./post-card";

interface PostListProps {
  posts: GetPostsDTO[];
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
