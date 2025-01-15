export default function SkeletonLoader() {
    return (
      <div className="animate-pulse space-y-4">
        {/* Header skeleton */}
        <div className="bg-gray-800 h-16 rounded-md" />
  
        {/* Articles skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 dark:bg-gray-700 h-48 rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }
  