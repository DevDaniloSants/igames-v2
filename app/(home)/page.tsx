import { getLatestNews } from "../_data-access/post/get-latest-news";
import LatestNews from "./_components/LatestNews";

const Home = async () => {
  const posts = await getLatestNews();
  return (
    <div className="w-full xl:max-w-[1200px]">
      <LatestNews posts={posts} />
    </div>
  );
};

export default Home;
