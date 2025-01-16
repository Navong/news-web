import { Suspense } from 'react';
import PaginatedNewsList from '@/components/PaginatedNewsList';
import { fetchNews } from '../../lib/fetchNews';
import Header from '@/components/Header';
import SkeletonLoader from '@/components/SkeletonLoader';

export const revalidate = 60; // Revalidate every 60 seconds
const ITEMS_PER_PAGE = 9;

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const data = await params;
  const newsPromise = fetchNews(data.category); // Fetch news data

  return (
    <main className="p-6">
      {/* Render the header immediately */}
      <Header category={data.category} />

      {/* Render the PaginatedNewsList with a loading fallback */}
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
