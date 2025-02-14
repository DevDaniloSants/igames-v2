import PostList from "../_components/post-list";
import { getCategories } from "../_data-access/category/get-categories";
import { getLatestNews } from "../_data-access/post/get-latest-news";
import { GetPostsSkipLatest } from "../_data-access/post/get-posts-skip-latest";
import CategoryList from "./_components/category-list";
import LatestNews from "./_components/LatestNews";

const Home = async () => {
  const latestNewsPosts = await getLatestNews();

  const categories = await getCategories();

  const postsSkipLatest = await GetPostsSkipLatest();

  return (
    <div className="w-full space-y-6 xl:w-[1200px]">
      <LatestNews posts={latestNewsPosts} />

      <CategoryList categories={categories} />

      <div className="max-w-[700px] space-y-4 pb-5">
        <h2 className="relative w-full text-2xl font-bold">Notícias</h2>
        <PostList posts={postsSkipLatest} />
      </div>
    </div>
  );
};

export default Home;
