
import React from 'react';

const NewsCardSkeleton = () => (
  <div className="rounded-2xl p-8 border-2 border-[rgb(var(--border))] bg-[rgb(var(--muted))] flex flex-col justify-between h-full animate-pulse">
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="h-6 w-24 bg-gray-300/50 dark:bg-gray-700/50 rounded-full"></div>
        <div className="h-4 w-32 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
      </div>
      <div className="h-8 w-3/4 bg-gray-300/50 dark:bg-gray-700/50 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
        <div className="h-4 w-11/12 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
        <div className="h-4 w-4/5 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
      </div>
    </div>
    <div className="h-5 w-40 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
  </div>
);

const NewsSkeleton = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[rgb(var(--background))] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-14 w-64 md:w-96 mx-auto bg-gray-300/50 dark:bg-gray-700/50 rounded mb-6"></div>
          <div className="h-6 w-full max-w-2xl mx-auto bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
        </div>

        {/* Search & Filters Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 animate-pulse">
          <div className="w-full md:w-1/2 h-12 bg-gray-300/50 dark:bg-gray-700/50 rounded-lg"></div>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-300/50 dark:bg-gray-700/50 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid md:grid-cols-2 gap-10">
          {[...Array(6)].map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSkeleton;
