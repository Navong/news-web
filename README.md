# News Website - ISR + SPA with Skeleton Loading

This project is a **News Website** built using **Next.js (App Router)**, **Zustand** for state management, and **Tailwind CSS** for styling. It integrates **Incremental Static Regeneration (ISR)** for optimized static content delivery, **Single Page Application (SPA)** features for seamless navigation, and **Skeleton Loading** for enhanced user experience during data fetching.

---

## Features

1. **Incremental Static Regeneration (ISR)**:
   - Fetches and regenerates static pages in the background every 60 seconds.
   - Ensures users receive fresh content without long loading times.

2. **Single Page Application (SPA)**:
   - Enables smooth client-side navigation without full page reloads.
   - Powered by dynamic routing in the Next.js App Router.

3. **Skeleton Loading**:
   - Provides a visual placeholder while content is being fetched.
   - Ensures a polished user experience.

4. **Dynamic Pagination**:
   - Paginate articles for a cleaner UI and improved navigation.

5. **Responsive Design**:
   - Fully responsive layout using Tailwind CSS.

---

## Implementation

### 1. Incremental Static Regeneration (ISR)

ISR is implemented using the `revalidate` property in the `CategoryPage` component. Static pages are regenerated in the background every 60 seconds.

#### Code Snippet: ISR in `CategoryPage`

```tsx
export const revalidate = 60; // Revalidate every 60 seconds
const ITEMS_PER_PAGE = 6;

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const newsPromise = fetchNews(params.category); // Fetch news data

  return (
    <main className="p-6">
      ........
      <Suspense fallback={<SkeletonLoader />}>
        <PaginatedNewsWrapper newsPromise={newsPromise} />
      </Suspense>
    </main>
  );
}
```

### 2. Skeleton Loading

The `SkeletonLoader` visually represents the layout of the news cards during data fetching. It enhances the user experience by preventing blank screens.

#### Code Snippet: SkeletonLoader Component

```tsx
export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-gray-200 animate-pulse rounded p-4">
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
```

### 3. Paginated News List

Pagination divides the news articles into pages for better navigation and readability. It uses client-side state management with React's `useState`.

#### Code Snippet: PaginatedNewsList Component

```tsx
export default function PaginatedNewsList({ articles, itemsPerPage }: { articles: any[]; itemsPerPage: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentArticles.map((article, index) => (
          <div key={index} className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg">{article.title}</h2>
            <p className="text-sm text-gray-600">{article.description}</p>
            <a href={article.url} className="text-indigo-500 mt-2 block" target="_blank" rel="noopener noreferrer">
              View More
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/news-website.git
   cd news-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add the required environment variable in `.env.local`:
   ```
   NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Tech Stack

- **Next.js (App Router)**: For server-side rendering, ISR, and routing.
- **Zustand**: Lightweight state management.
- **Tailwind CSS**: Utility-first styling for responsive design.
- **News API**: Fetches the latest news articles.

---

## Future Improvements

1. **Search Functionality**: Allow users to search for specific articles.
2. **User Authentication**: Add login/logout features to save preferences.
3. **Dark Mode**: Improve accessibility with a toggleable dark theme.

