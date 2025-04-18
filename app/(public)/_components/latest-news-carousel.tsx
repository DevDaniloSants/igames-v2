"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/_components/ui/carousel";
import { useIsMobile } from "@/app/_hooks/use-mobile";
import { Post } from "@prisma/client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Link from "next/link";

interface LatestNewsProps {
  posts: Post[];
}

const LatestNewsCarousel = ({ posts }: LatestNewsProps) => {
  const isMobile = useIsMobile();

  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  if (isMobile) {
    return (
      <Carousel className="h-[300px] w-full" plugins={[plugin.current]}>
        <CarouselContent>
          {posts.map((post, index) => (
            <CarouselItem
              key={index}
              className="group relative h-full cursor-pointer overflow-hidden"
            >
              <Link href={`/posts/${post.id}`} key={index}>
                <div className="relative h-[300px] w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    priority
                    sizes="100%"
                    className="object-cover transition-all duration-300 group-hover:scale-110 md:object-center"
                  />
                </div>
                <div className="absolute bottom-2 z-10 w-full pb-2 pl-4">
                  <h2 className="w-[90%] truncate text-lg font-bold group-hover:text-secondary-foreground">
                    {post.title}
                  </h2>
                  <p className="w-[90%] truncate">{post.content}</p>
                </div>
                <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black via-black/70" />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <div className="grid min-h-[600px] grid-rows-3 gap-2 overflow-hidden lg:grid-cols-2 lg:grid-rows-none">
      <Link
        href={`/posts/${posts[0].id}`}
        className="group relative cursor-pointer overflow-hidden lg:rounded-l-lg"
      >
        <Image
          src={posts[0].imageUrl}
          alt={posts[0].title}
          fill
          sizes="100%"
          priority
          className="object-cover transition-all duration-300 group-hover:scale-110 md:object-top lg:rounded-l-lg"
        />
        <div className="absolute bottom-2 z-10 w-full pb-2 pl-4">
          <h2 className="text-lg font-bold group-hover:text-secondary-foreground">
            {posts[0].title}
          </h2>
          <p className="truncate">{posts[0].content}</p>
        </div>
        <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black via-black/70" />
      </Link>
      <div className="block h-full gap-2 space-y-2 lg:grid lg:space-y-0">
        {posts.slice(1).map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div
              key={post.id}
              className="group relative h-full cursor-pointer overflow-hidden"
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="100%"
                priority
                className="object-cover transition-all duration-300 group-hover:scale-110 md:object-center"
              />
              <div className="absolute bottom-2 z-10 w-full pb-2 pl-4">
                <h2 className="text-lg font-bold group-hover:text-secondary-foreground">
                  {post.title}
                </h2>
                <p className="truncate">{post.content}</p>
              </div>
              <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black via-black/70" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestNewsCarousel;
