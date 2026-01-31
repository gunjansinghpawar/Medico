
import React from 'react';

const BlogCardSkeleton = () => (
  <div className="bg-card rounded-2xl shadow-md border border-border h-[450px] flex flex-col overflow-hidden animate-pulse">
    <div className="h-48 w-full bg-gray-300/50 dark:bg-gray-700/50"></div>
    <div className="p-5 flex-1 flex flex-col justify-between">
       <div className="space-y-3">
         <div className="h-4 w-24 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
         <div className="h-6 w-3/4 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
         <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
            <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
         </div>
       </div>
       <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-gray-300/50 dark:bg-gray-700/50"></div>
             <div className="space-y-1">
                <div className="h-3 w-20 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
                <div className="h-3 w-16 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
             </div>
          </div>
          <div className="h-4 w-12 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
       </div>
    </div>
  </div>
);

const BlogSkeleton = () => {
    return (
        <div className="pt-16 bg-background min-h-screen">
             <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="text-center mb-12 animate-pulse">
                    <div className="h-12 w-64 mx-auto bg-gray-300/50 dark:bg-gray-700/50 rounded mb-4"></div>
                    <div className="h-6 w-96 mx-auto bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
                </div>
                
                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 animate-pulse">
                   {[1,2,3,4,5].map(i => (
                       <div key={i} className="h-10 w-24 bg-gray-300/50 dark:bg-gray-700/50 rounded-full"></div>
                   ))}
                </div>

                {/* Featured Skeleton */}
                 <div className="container mx-auto px-4 md:px-6 mb-16 animate-pulse">
                    <div className="rounded-3xl border border-border bg-card overflow-hidden h-[500px] md:h-[400px]">
                         <div className="grid lg:grid-cols-2 h-full">
                            <div className="bg-gray-300/50 dark:bg-gray-700/50 h-64 lg:h-full w-full"></div>
                            <div className="p-6 md:p-10 flex flex-col justify-center space-y-6">
                                <div className="h-6 w-32 bg-gray-300/50 dark:bg-gray-700/50 rounded-full"></div>
                                <div className="h-10 w-3/4 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
                                <div className="space-y-2">
                                     <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
                                     <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
                                     <div className="h-4 w-2/3 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
                                </div>
                                <div className="flex gap-4">
                                     <div className="w-10 h-10 rounded-full bg-gray-300/50 dark:bg-gray-700/50"></div>
                                     <div className="space-y-2">
                                         <div className="h-4 w-32 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
                                         <div className="h-3 w-24 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
                                     </div>
                                </div>
                            </div>
                         </div>
                    </div>
                 </div>

                 {/* Grid Skeleton */}
                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)}
                 </div>
             </div>
        </div>
    )
}
export default BlogSkeleton;
