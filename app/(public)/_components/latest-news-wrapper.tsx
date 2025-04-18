import { getLatestNews } from "@/app/_data-access/post/get-latest-news";

import LatestNewsCarousel from "./latest-news-carousel";

const LatestNewsWrapper = async () => {
  const latestNewsPosts = await getLatestNews();
  return <LatestNewsCarousel posts={latestNewsPosts} />;
};

export default LatestNewsWrapper;
