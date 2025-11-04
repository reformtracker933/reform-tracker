import NewsClient from "@/components/screens/newsSection/NewsClient";
import { getAllNews, getRecentUpdates } from "@/sanity/lib/fetch";

export default async function NewsPage() {
  const [allNews, recentUpdates] = await Promise.all([
    getAllNews("bn", 0, 100),
    getRecentUpdates("bn", 20),
  ]);

  return <NewsClient allNews={allNews} recentUpdates={recentUpdates} />;
}
