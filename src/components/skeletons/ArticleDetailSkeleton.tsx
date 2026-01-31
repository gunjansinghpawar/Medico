
import React from 'react';

const ArticleDetailSkeleton = () => {
  return (
    <article className="pt-24 min-h-screen bg-background text-foreground animate-pulse">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Back Link Skeleton */}
        <div className="h-4 w-32 bg-gray-300/50 dark:bg-gray-700/50 rounded mb-8"></div>

        {/* Header Skeleton */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center gap-3 mb-6 justify-center md:justify-start">
             <div className="h-6 w-20 bg-gray-300/50 dark:bg-gray-700/50 rounded-full"></div>
             <div className="h-4 w-24 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
             <div className="h-4 w-20 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
          </div>

          <div className="h-10 md:h-14 w-full md:w-3/4 bg-gray-300/50 dark:bg-gray-700/50 rounded mb-4 mx-auto md:mx-0"></div>
          <div className="h-10 md:h-14 w-2/3 md:w-1/2 bg-gray-300/50 dark:bg-gray-700/50 rounded mb-8 mx-auto md:mx-0"></div>

          <div className="flex items-center justify-center md:justify-start gap-3">
             <div className="w-12 h-12 rounded-full bg-gray-300/50 dark:bg-gray-700/50"></div>
             <div className="space-y-2 text-left">
               <div className="h-4 w-32 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
               <div className="h-3 w-16 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
             </div>
          </div>
        </header>

        {/* Image Skeleton */}
        <div className="w-full aspect-video rounded-3xl bg-gray-300/50 dark:bg-gray-700/50 mb-12"></div>

        {/* Content Skeleton */}
        <div className="space-y-4 mb-16">
           <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
           <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
           <div className="h-4 w-11/12 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
           <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
           <div className="h-4 w-5/6 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
           <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
           <br />
           <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
           <div className="h-4 w-11/12 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
           <div className="h-4 w-4/5 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="border-t border-border pt-8 pb-16 flex justify-between items-center">
           <div className="flex gap-2">
              <div className="h-8 w-24 bg-gray-300/50 dark:bg-gray-700/50 rounded-lg"></div>
              <div className="h-8 w-20 bg-gray-300/50 dark:bg-gray-700/50 rounded-lg"></div>
           </div>
        </div>
        
      </div>
    </article>
  );
};

export default ArticleDetailSkeleton;
