# News Website - ISR + SPA with Skeleton Loading
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-Latest-orange?style=flat)](https://github.com/pmndrs/zustand)
[![pnpm](https://img.shields.io/badge/pnpm-7.10.0-blue?style=flat)](https://pnpm.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-green?style=flat)](https://vercel.com/)

A modern, performant news website leveraging Next.js App Router with Incremental Static Regeneration (ISR), Single Page Application (SPA) capabilities, and skeleton loading for optimal user experience.

## 📑 Table of Contents
1. [🚀 Key Features](#-key-features)
2. [🛠️ Tech Stack](#-tech-stack)
3. [📦 Installation](#-installation)
4. [🔧 Core Implementation](#-core-implementation)
    - [ISR Configuration](#isr-configuration)
    - [Skeleton Loading](#skeleton-loading)
5. [🔍 Key Implementation Details](#-key-implementation-details)
6. [🎯 What I Learned and How I Solved It](#-what-i-learned-and-how-i-solved-it)
7. [🚧 Future Improvements](#-future-improvements)
8. [🤝 Contributing](#-contributing)
9. [📝 License](#-license)
10. [📬 Contact](#-contact)

## 🚀 Key Features

- **Incremental Static Regeneration (ISR)**
  - Auto-regenerates static pages every 60 seconds
  - Balances content freshness with performance
  - Optimized server load and delivery

- **Single Page Application (SPA)**
  - Seamless client-side navigation
  - No full page reloads
  - Enhanced user experience

- **Skeleton Loading**
  - Polished loading states
  - Reduced perceived loading time
  - Smooth content transitions

- **Smart Pagination**
  - Dynamic article pagination
  - Customizable items per page
  - Intuitive navigation controls

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Cross-device compatibility

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js (App Router)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Data Source**: News API
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/news-web.git
cd news-web
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

5. **View the application**
Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Core Implementation

### ISR Configuration
```tsx
// app/[category]/page.tsx
export const revalidate = 60; // 60-second revalidation

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const newsPromise = fetchNews(params.category);
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <PaginatedNewsWrapper newsPromise={newsPromise} />
    </Suspense>
  );
}
```

### Skeleton Loading
```tsx
// components/SkeletonLoader.tsx
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

## 🔍 Key Implementation Details

### State Management
- Using Zustand for lightweight, scalable state management
- Centralized store for pagination and filters
- Efficient updates with minimal re-renders

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Breakpoint optimization for various devices
- Fluid typography and spacing

### Performance Optimization
- Image optimization with Next.js Image component
- Lazy loading for off-screen content
- Minimized bundle size

## 🎯 What I Learned and How I Solved It

### 1. Content Freshness vs Performance
**What I Learned**: Balancing the delivery of fresh content with server load is crucial for maintaining both user experience and performance.  
**How I Solved It**: I implemented Incremental Static Regeneration (ISR) with a 60-second revalidation period. This approach allowed me to deliver up-to-date content while minimizing the strain on the server by generating new pages only when necessary.

### 2. Loading States
**What I Learned**: A smooth loading experience is essential for improving user perception of website performance, especially on first load.  
**How I Solved It**: I developed a skeleton loading system that mimics the final content layout. This way, users experience a consistent and less jarring loading experience.

### 3. Mobile Responsiveness
**What I Learned**: Complex layouts can easily break on mobile devices, leading to a poor user experience.  
**How I Solved It**: I focused on a mobile-first design approach using Tailwind CSS breakpoints. This ensured that the layout adapts seamlessly to various screen sizes, enhancing the mobile user experience.

### 4. Image Optimization
**What I Learned**: The Next.js Image component provides built-in optimization, but issues can arise when working with images from external sources.  
**How I Solved It**: I used the `next/image` component with the `unoptimized` option, specifically for images from external sources. This solution allowed me to optimize images while maintaining flexibility with content origins.

### 5. Mobile Responsiveness (Revisited)
**What I Learned**: Mobile responsiveness remains a recurring challenge for websites with complex layouts and diverse content types.  
**How I Solved It**: I continuously refined my mobile-first design strategy by leveraging Tailwind CSS breakpoints to ensure optimal responsiveness across all devices.

### 6. Slow Largest Contentful Paint (LCP)
**What I Learned**: Slow LCP can significantly affect user experience and website performance, especially for images that are slow to load.  
**How I Solved It**: I used the `priority` attribute in the Next.js Image component to preload critical images. This allowed the images to load faster, reducing LCP and improving page load speed.

## 🚧 Future Improvements

1. **Enhanced Search**
   - Advanced filtering
   - Real-time search suggestions
   - Search history

2. **User Features**
   - Authentication system
   - Personalized news feed
   - Saved articles

3. **Performance**
   - Service Worker integration
   - Offline support
   - Push notifications

4. **UI/UX**
   - Dark mode support
   - Reading time estimates
   - Share functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

- Project Link: [https://github.com/Navong/news-web](https://github.com/your-username/news-website)
- Email: bongchannavong@outlook.com
