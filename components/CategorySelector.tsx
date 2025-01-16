'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

export default function CategorySelector() {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction : string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Function to scroll to active category
  const scrollToActive = () => {
    const activeElement = scrollContainerRef.current?.querySelector(`a[href="${pathname}"]`);
    if (activeElement) {
      const container = scrollContainerRef.current;
      if (!container) return;
      const containerWidth = container.offsetWidth;
      const elementOffset = (activeElement as HTMLElement).offsetLeft;
      const elementWidth = (activeElement as HTMLElement).offsetWidth;
      
      // Calculate the scroll position to center the element
      const scrollPosition = elementOffset - (containerWidth / 2) + (elementWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to active category only on initial render and pathname change
  useEffect(() => {
    scrollToActive();
  }, [pathname]);

  return (
    <div className="relative max-w-full px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => scroll('left')}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-200 ${
          showLeftScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-200 ${
          showRightScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-scroll py-4 px-2 scroll-smooth no-scrollbar"
        onScroll={checkScroll}
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/${cat}`}
            className={`
              px-3 py-2 rounded-full whitespace-nowrap text-sm font-medium
              transition-all duration-200 hover:shadow-md flex-shrink-0
              ${pathname === `/${cat}`
                ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}