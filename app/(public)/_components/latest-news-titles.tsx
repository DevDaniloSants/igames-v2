import { getLatestNews } from "@/app/_data-access/post/get-latest-news";
import Link from "next/link";

const LatestNewsTitles = async () => {
  const latestNewsPosts = await getLatestNews();
  return (
    <>
      {latestNewsPosts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <div key={post.id} className="group cursor-pointer rounded-md">
            <h4 className="w-10/12 truncate text-xl font-bold text-secondary-foreground transition-all duration-300 group-hover:text-primary lg:text-sm">
              {post.title}
            </h4>
            <p className="w-11/12 truncate text-sm text-muted-foreground lg:text-xs">
              {post.content}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};
export default LatestNewsTitles;
