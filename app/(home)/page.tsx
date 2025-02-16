import {
  BsDiscord,
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
import PostList from "../_components/post-list";
import { Button } from "../_components/ui/button";
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 overflow-hidden pb-5 lg:col-span-2">
          <h2 className="relative text-2xl font-bold before:absolute before:left-28 before:top-4 before:h-1 before:w-full before:bg-secondary before:lg:w-4/5">
            Notícias
          </h2>
          <PostList posts={postsSkipLatest} />
        </div>
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold lg:text-lg lg:font-semibold">
              Redes Sociais
            </h3>
            <hr />
            <div className="flex flex-wrap gap-2">
              <Button className="dark:shadow-lgdark:focus:ring-pink-800 rounded-lg bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-pink-300">
                <BsInstagram />
                Instagram
              </Button>
              <Button className="rounded-lg bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300">
                <BsYoutube />
                YouTube
              </Button>
              <Button className="rounded-lg bg-gradient-to-r from-indigo-900 via-indigo-600 to-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800">
                <BsDiscord />
                Discord
              </Button>
              <Button className="rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                <BsFacebook />
                Facebook
              </Button>
              <Button className="rounded-lg bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-zinc-300 dark:focus:ring-zinc-800">
                <BsTwitterX />
                Twitter
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold lg:text-lg lg:font-semibold">
              Notícias Recentes
            </h3>
            <hr />
            <div className="space-y-4">
              {latestNewsPosts.map((post) => (
                <div key={post.id} className="group cursor-pointer rounded-md">
                  <h4 className="w-10/12 truncate text-xl font-bold text-secondary-foreground transition-all duration-300 group-hover:text-primary lg:text-sm">
                    {post.title}
                  </h4>
                  <p className="w-full truncate text-base text-muted-foreground lg:text-xs">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
