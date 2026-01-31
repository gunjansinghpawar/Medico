'use client';

import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetBlogsQuery } from '@/store/api/apiSlice';
import { IBlog, IAuthor } from '@/types';
import BlogSkeleton from '@/components/skeletons/BlogSkeleton';
import { MOCK_BLOGS } from '@/data/mockData';

type BlogPost = {
  id: string; // Changed to string for MongoDB _id
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
};

const Blog = () => {
  const { data, isLoading, isError } = useGetBlogsQuery({ page: 1, limit: 50 });
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  if (isLoading) return <BlogSkeleton />;
  // if (isError) return <div className="pt-24 text-center text-red-500">Failed to load blogs. Please try again later.</div>;

  const blogs = (isError || !data?.blogs || data.blogs.length === 0) ? MOCK_BLOGS : data.blogs;
  
  // Helper to safely get author name
  const getAuthorName = (author: string | IAuthor) => {
    if (typeof author === 'string') return 'Unknown Author';
    return author.name || 'Unknown Author';
  };

  const mapBlogToPost = (blog: IBlog): BlogPost => ({
    id: blog._id,
    title: blog.title,
    excerpt: blog.content.substring(0, 100) + '...', // Simple excerpt
    author: getAuthorName(blog.authorId),
    date: new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: `${Math.ceil(blog.content.length / 1000)} min read`, // Rough estimate
    category: blog.tags[0] || 'Health',
    image: blog.thumbnail || 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800', // Fallback
    featured: false // Logic for featured can be added later
  });

  const allPosts: BlogPost[] = blogs.map(mapBlogToPost);

  // If no blogs, show some dummy or empty state. For now, let's keep the UI logic.
  // We can designate the first one as featured if available.
  let featuredPost: BlogPost | undefined = allPosts.length > 0 ? { ...allPosts[0], featured: true } : undefined;
  
  // Exclude featured from grid if we singled it out
  const gridPosts = allPosts.length > 0 ? allPosts.slice(1) : [];

  const categories = [
    "All Posts",
    ...Array.from(new Set(allPosts.map(p => p.category).filter(Boolean)))
  ];

  const filteredPosts = selectedCategory === "All Posts"
    ? gridPosts
    : gridPosts.filter(p => p.category === selectedCategory);


  return (
    <div className="pt-16 bg-background text-foreground fade-in">
      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Health <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Insights</span>
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto text-muted-foreground">
            Expert insights, research-backed articles, and practical health guidance.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 border border-border ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {selectedCategory === "All Posts" && featuredPost && (
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <div className="rounded-3xl shadow-xl border border-border bg-card overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 md:h-80 lg:h-full">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{featuredPost.author}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredPost.date}
                      </div>
                    </div>
                  </div>
                  <Link href={`/blog/${featuredPost.id}`}>
                    <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold px-6 py-2 rounded-xl hover:from-blue-700 hover:to-green-700 transition cursor-pointer">
                      <span className="flex items-center gap-2">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-card rounded-2xl shadow-md border border-border hover:shadow-xl transition overflow-hidden group flex flex-col h-full">
              <Link href={`/blog/${post.id}`} className="block relative h-48 overflow-hidden cursor-pointer">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-muted/90 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
                <Link href={`/blog/${post.id}`} className="block mb-2">
                  <h3 className="text-lg font-bold group-hover:text-accent transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{post.author}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`} className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-1 cursor-pointer">
                    Read <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
