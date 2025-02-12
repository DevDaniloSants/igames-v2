"use client";

import { useIsMobile } from "@/app/_hooks/use-mobile";
import { Post } from "@prisma/client";
import Image from "next/image";

interface LatestNewsProps {
  posts: Post[];
}

const LatestNews = ({ posts }: LatestNewsProps) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <div>Mobile</div>;
  }

  return (
    <div className="grid h-96 grid-cols-1 gap-2 lg:grid-cols-2">
      <div className="relative">
        <Image
          src={posts[0].imageUrl}
          alt={posts[0].title}
          fill
          sizes="100%"
          className="object-cover md:object-top lg:rounded-l-lg"
        />
        <div className="absolute bottom-2 z-10 pb-2 pl-4">
          <h2 className="text-lg font-bold">{posts[0].title}</h2>
          <p>{posts[0].content}</p>
        </div>
        <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black via-black/70" />
      </div>
      <div className="block h-full gap-2 space-y-2 lg:grid lg:space-y-0">
        {posts.slice(1).map((post) => (
          <div key={post.id} className="relative h-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="100%"
              className="object-cover md:object-center"
            />
            <div className="absolute bottom-2 z-10 pb-2 pl-4">
              <h2 className="text-lg font-bold">{post.title}</h2>
              <p>{post.content}</p>
            </div>
            <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black via-black/70" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
