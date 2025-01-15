'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

export default function CategorySelector() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 px-8 my-4">
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/${cat}`}
          className={`
            px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium
            transition-all duration-200 hover:shadow-md
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
  );
}

