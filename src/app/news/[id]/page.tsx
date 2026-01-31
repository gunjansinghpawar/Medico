
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, ExternalLink } from 'lucide-react';

import { useGetNewsByIdQuery } from '@/store/api/apiSlice';
import { MOCK_NEWS } from '@/data/mockData';
import ArticleDetailSkeleton from '@/components/skeletons/ArticleDetailSkeleton';
import { IAuthor } from '@/types';

const NewsDetail = () => {
  const { id } = useParams();
  const newsId = typeof id === 'string' ? id : '';

  const { data: news, isLoading, isError } = useGetNewsByIdQuery(newsId, {
    skip: !newsId,
  });

  if (isLoading) return <ArticleDetailSkeleton />;

  // Initial data source
  let displayNews = news;

  // Fallback to mock data if API fails or returns nothing, and if param matches a mock ID
  // OR if we just want to robustly support mock scenarios for demo
  if ((isError || !news) && newsId) {
    const mockFound = MOCK_NEWS.find((n) => n._id === newsId);
    if (mockFound) {
        displayNews = mockFound;
    }
  }

  if (!displayNews) {
    return (
      <div className="pt-32 text-center container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">News Article Not Found</h2>
        <p className="text-muted-foreground mb-8">The news article you are looking for does not exist or has been removed.</p>
        <Link 
          href="/news" 
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Back to News
        </Link>
      </div>
    );
  }

  const getAuthorName = (author: string | IAuthor) => {
    if (typeof author === 'string') return 'Unknown Author';
    return author.name || 'Unknown Author';
  };

  const publishDate = new Date(displayNews.publishedAt || displayNews.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Calculate read time roughly
  const readTime = `${Math.ceil(displayNews.body.length / 1000)} min read`;
  const authorName = getAuthorName(displayNews.createdBy);

  return (
    <article className="pt-24 min-h-screen bg-background text-foreground animate-in fade-in duration-500">
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Link 
          href="/news" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all news
        </Link>

        {/* Header */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6 justify-center md:justify-start">
             <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
               {displayNews.category}
             </span>
             <span className="flex items-center">
               <Calendar className="w-4 h-4 mr-1" />
               {publishDate}
             </span>
             <span className="flex items-center">
               <Clock className="w-4 h-4 mr-1" />
               {readTime}
             </span>
             {displayNews.source && (
               <span className="flex items-center font-semibold text-foreground/80">
                  via {displayNews.source}
               </span>
             )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
            {displayNews.headline}
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-3">
             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                <User className="w-6 h-6" />
             </div>
             <div className="text-left">
               <div className="font-semibold text-lg">{authorName}</div>
               <div className="text-sm text-muted-foreground">Author</div>
             </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-16 px-2 md:px-0">
          <p className="lead text-xl md:text-2xl leading-relaxed text-muted-foreground mb-8">
             {displayNews.body.substring(0, 200)}...
          </p>
          
          <div className="whitespace-pre-wrap leading-8 text-neutral-700 dark:text-neutral-300">
            {displayNews.body}
          </div>
        </div>

        {/* Share / Tags / Footer */}
        <div className="border-t border-border pt-8 pb-16 flex justify-between items-center">
           <div className="flex flex-wrap gap-2">
              <span className="bg-muted px-4 py-2 rounded-lg text-sm font-medium">
                  #{displayNews.category}
              </span>
           </div>
           
           {/* If there was a real external link, we could put it here */}
        </div>
        
      </div>
    </article>
  );
};

export default NewsDetail;
