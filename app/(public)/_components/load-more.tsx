"use client";

import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import PostList from "./post-list";
import { GetPostsDTO } from "@/app/_data-access/post/get-posts";

const LoadMore = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [data, setData] = useState<GetPostsDTO[]>([]);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}`,
        );

        const data = await res.json();
        console.log(data);

        if (data.length === 0) {
          setHasMore(false);
          return;
        }

        setData((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (inView) {
      fetchPosts();
    }
  }, [inView, page, hasMore, isLoading]);

  return (
    <>
      {data.length > 0 && (
        <PostList posts={data} className="flex flex-col gap-4" />
      )}
      {hasMore && (
        <div ref={ref} className="flex items-center justify-center">
          <Loader2Icon className="h-8 w-8 animate-spin" />
        </div>
      )}
    </>
  );
};

export default LoadMore;
