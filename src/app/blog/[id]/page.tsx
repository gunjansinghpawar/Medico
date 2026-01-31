
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

import { useGetBlogByIdQuery } from '@/store/api/apiSlice';
import { MOCK_BLOGS } from '@/data/mockData';
import ArticleDetailSkeleton from '@/components/skeletons/ArticleDetailSkeleton';
import { IAuthor } from '@/types';

const BlogDetail = () => {
  const { id } = useParams();
  const blogId = typeof id === 'string' ? id : '';

  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(blogId, {
    skip: !blogId,
  });

  if (isLoading) return <ArticleDetailSkeleton />;

  // Initial data source
  let displayBlog = blog;

  // Fallback to mock data if API fails or returns nothing, and if param matches a mock ID
  // OR if we just want to robustly support mock scenarios for demo
  if ((isError || !blog) && blogId) {
    const mockFound = MOCK_BLOGS.find((b) => b._id === blogId);
    if (mockFound) {
      displayBlog = mockFound;
    }
  }

  if (!displayBlog) {
    return (
      <div className="pt-32 text-center container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
        <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link 
          href="/blog" 
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  const getAuthorName = (author: string | IAuthor) => {
    if (typeof author === 'string') return 'Unknown Author';
    return author.name || 'Unknown Author';
  };

  const publishDate = new Date(displayBlog.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const readTime = `${Math.ceil(displayBlog.content.length / 1000)} min read`;
  const authorName = getAuthorName(displayBlog.authorId);
  const imageUrl = displayBlog.thumbnail || 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <article className="pt-24 min-h-screen bg-background text-foreground animate-in fade-in duration-500">
      {/* progress bar could go here */}
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all posts
        </Link>

        {/* Header */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6 justify-center md:justify-start">
             <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
               {displayBlog.tags[0] || 'Article'}
             </span>
             <span className="flex items-center">
               <Calendar className="w-4 h-4 mr-1" />
               {publishDate}
             </span>
             <span className="flex items-center">
               <Clock className="w-4 h-4 mr-1" />
               {readTime}
             </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
            {displayBlog.title}
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

        {/* Featured Image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
          <Image
            src={imageUrl}
            alt={displayBlog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-16 px-2 md:px-0">
          <p className="lead text-xl md:text-2xl leading-relaxed text-muted-foreground mb-8">
             {/* Simulating a lead paragraph if content is plain text */}
             {displayBlog.content.split('\n')[0]}
          </p>
          
          <div className="whitespace-pre-wrap leading-8 text-neutral-700 dark:text-neutral-300">
            {displayBlog.content}
          </div>
        </div>

        {/* Share / Tags / Footer */}
        <div className="border-t border-border pt-8 pb-16">
           <div className="flex flex-wrap gap-2">
             {displayBlog.tags.map((tag, idx) => (
                <span key={idx} className="bg-muted px-4 py-2 rounded-lg text-sm font-medium">
                  #{tag}
                </span>
             ))}
           </div>
        </div>
        
      </div>
    </article>
  );
};

export default BlogDetail;
