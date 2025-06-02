import { getCategories } from "../../_data-access/category/get-categories";

import CategoryList from "../_components/category-list";

import { Suspense } from "react";
import LatestNewsWrapper from "../_components/latest-news-wrapper";
import LatestNewsTitles from "../_components/latest-news-titles";
import SocialMediaLinks from "../_components/social-media-links";
import {
  LatestNewsCarouselSkeleton,
  LatestNewsTitlesSkeleton,
  PostListSkeleton,
} from "../_components/skeletons";
import PostListWrapper from "../_components/post-list-wrapper";
import { GetPostsSkipLatest } from "@/app/_data-access/post/get-posts-skip-latest";
import SearchForm from "../_components/search-form";

const Home = async () => {
  const categories = await getCategories();

  return (
    <div className="w-full space-y-6 xl:w-[1200px]">
      <Suspense fallback={<LatestNewsCarouselSkeleton />}>
        <LatestNewsWrapper />
      </Suspense>

      <CategoryList categories={categories} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 overflow-hidden pb-5 lg:col-span-2">
          <h2 className="relative text-2xl font-bold before:absolute before:left-28 before:top-4 before:h-1 before:w-full before:bg-secondary before:lg:w-4/5">
            Notícias
          </h2>

          <Suspense fallback={<PostListSkeleton />}>
            <PostListWrapper fetchPosts={GetPostsSkipLatest} />
          </Suspense>
        </div>
        <div className="w-full space-y-6">
          <SearchForm />
          <div className="space-y-2">
            <h3 className="text-2xl font-bold lg:text-lg lg:font-semibold">
              Redes Sociais
            </h3>
            <hr />
            <SocialMediaLinks />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold lg:text-lg lg:font-semibold">
              Notícias Recentes
            </h3>
            <hr />
            <div className="flex w-full flex-col gap-2">
              <Suspense fallback={<LatestNewsTitlesSkeleton />}>
                <LatestNewsTitles />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
