import { Hero } from "@/components/screens/landing/Hero";
import { Newsletter } from "@/components/screens/landing/Newsletter";
import { ReformNews } from "@/components/screens/landing/ReformNews";
import { ReformUpdate } from "@/components/screens/landing/ReformUpdate";
import { getFeaturedNews, getRecentUpdates } from "@/sanity/lib/fetch";

export default async function Home() {
  // Fetch featured news and recent updates from Sanity
  const [featuredNews, recentUpdates] = await Promise.all([
    getFeaturedNews("bn"), // Get featured news articles in Bangla
    getRecentUpdates("bn", 4), // Get 4 recent updates in Bangla
  ]);

  return (
    <div className="min-h-screen w-full">
      <Hero />
      <div className="px-4 w-full">
        <ReformNews newsArticles={featuredNews} />
        <ReformUpdate updates={recentUpdates} />
        <Newsletter />
      </div>
    </div>
  );
}
