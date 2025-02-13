import { getCategories } from "../_data-access/category/get-categories";
import { getLatestNews } from "../_data-access/post/get-latest-news";
import CategoryList from "./_components/category-list";
import LatestNews from "./_components/LatestNews";

const Home = async () => {
  const posts = await getLatestNews();
  const categories = await getCategories();
  return (
    <div className="w-full flex-wrap xl:max-w-[1200px]">
      <LatestNews posts={posts} />
      <div className="pt-6">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default Home;
