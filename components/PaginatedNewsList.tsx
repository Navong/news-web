'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
}

interface PaginatedNewsListProps {
  articles: Article[];
  itemsPerPage: number;
}

export default function PaginatedNewsList({ articles, itemsPerPage }: PaginatedNewsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0); // Track viewport width

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  useEffect(() => {
    // Set initial viewport width
    setViewportWidth(window.innerWidth);

    // Update viewport width on resize
    const handleResize = () => setViewportWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPageNumbers = () => {
    const pages = [];
    // Use viewportWidth instead of window.innerWidth
    const delta = viewportWidth < 640 ? 1 : 2;

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      pages.push(i);
    }

    if (currentPage - delta > 2) {
      pages.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      pages.push('...');
    }

    pages.unshift(1);
    if (totalPages !== 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-8">
      {/* Grid container with responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {currentArticles.map((article, index) => (
          <article
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col"
          >
            {/* Image container with aspect ratio */}
            {article.urlToImage && (
              <div className="relative w-full pt-[56.25%]">
                <Image
                  width={600}
                  height={400}
                  src={article.urlToImage}
                  alt={article.title}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                  unoptimized={!article.urlToImage?.includes('trusted-domain.com')}
                />
              </div>
            )}

            {/* Content container */}
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              <h2 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 flex-grow text-black">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {article.description}
              </p>

              {/* Footer section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-auto pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500 order-2 sm:order-1">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium order-1 sm:order-2"
                >
                  Read More →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Responsive pagination controls */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-8 px-4">
        <button
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
          className={`px-3 sm:px-4 py-2 rounded-md text-sm ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">←</span>
        </button>

        <div className="flex gap-1 sm:gap-2">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
              className={`min-w-[2.5rem] px-2 sm:px-4 py-2 rounded-md text-sm ${
                page === currentPage
                  ? 'bg-indigo-600 text-white'
                  : page === '...'
                  ? 'cursor-default'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 sm:px-4 py-2 rounded-md text-sm ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">→</span>
        </button>
      </div>
    </div>
  );
}