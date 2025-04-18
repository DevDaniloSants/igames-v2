import PostList from "../_components/post-list";
import { getCategories } from "../../_data-access/category/get-categories";

import { GetPostsSkipLatest } from "../../_data-access/post/get-posts-skip-latest";
import CategoryList from "../_components/category-list";

import { Suspense } from "react";
import LatestNewsWrapper from "../_components/latest-news-wrapper";
import LatestNewsTitles from "../_components/latest-news-titles";
import SocialMediaLinks from "../_components/social-media-links";
import { LatestNewsCarouselSkeleton } from "../_components/skeletons";

const Home = async () => {
  const categories = await getCategories();

  const postsSkipLatest = await GetPostsSkipLatest();

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

          <PostList
            posts={postsSkipLatest}
            className="flex h-full w-full flex-col gap-4"
          />
        </div>
        <div className="w-full space-y-6">
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
              <Suspense fallback={<div>Loading...</div>}>
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
