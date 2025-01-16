// app/page.tsx
import PaginatedNewsList from '@/components/PaginatedNewsList';
import { fetchNews } from '../lib/fetchNews';
import Header from '@/components/Header';
import { Suspense } from 'react';
import SkeletonLoader from '@/components/SkeletonLoader';

export const revalidate = 60;

const ITEMS_PER_PAGE = 9;

export default async function Home() {
  const newsPromise = await fetchNews('general');

  return (
    <main className="p-6">
      <Header category={"Top Headlines"} />
      <Suspense fallback={<SkeletonLoader />}>
        {/* Wrap PaginatedNewsList in a dynamic wrapper to allow client-side rendering */}
        <PaginatedNewsWrapper newsPromise={newsPromise} />
      </Suspense>
    </main>
  );
}

// Client-side wrapper for PaginatedNewsList
async function PaginatedNewsWrapper({ newsPromise }: { newsPromise: Promise<any> }) {
  const news = await newsPromise; // Resolve the promise to fetch news
  return <PaginatedNewsList articles={news.articles} itemsPerPage={ITEMS_PER_PAGE} />;
}