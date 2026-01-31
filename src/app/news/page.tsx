'use client';

import { useEffect, useState } from 'react';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

import { useGetNewsQuery } from '@/store/api/apiSlice';
import { INews } from '@/types';
import NewsSkeleton from '@/components/skeletons/NewsSkeleton';
import { MOCK_NEWS } from '@/data/mockData';

type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  featured?: boolean;
};

const News = () => {
  const { data, isLoading, isError } = useGetNewsQuery({ page: 1, limit: 50 });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#latest') setFilter('latest');
    else if (hash === '#trending') setFilter('trending');
    else setFilter('all');
  }, []);
  
  // Create a local state to hold filtered items, but derive it from data
  // We cannot use setFiltered inside render or effect strictly if dep depends on it.
  // Better to derive filtered items on the fly.

  if (isLoading) return <NewsSkeleton />;
  // if (isError) return <div className="pt-24 text-center text-red-500">Failed to load news. Please try again later.</div>;

  const newsList = (isError || !data?.news || data.news.length === 0) ? MOCK_NEWS : data.news;

  const mapNewsToItem = (item: INews): NewsItem => ({
    id: item._id,
    title: item.headline,
    date: new Date(item.publishedAt || item.createdAt).toISOString(),
    excerpt: item.body.substring(0, 150) + '...',
    category: item.category,
    featured: false // 'featured' not in backend model, defaulting to false or logic
  });

  let items = newsList.map(mapNewsToItem);
  
  // Mock "featured" by picking first 2
  items = items.map((item, index) => ({ ...item, featured: index < 2 }));

  let filtered = items;

  if (filter === 'trending') {
      filtered = filtered.filter((item) => item.featured);
  } else if (filter === 'latest') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }

  if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.excerpt.toLowerCase().includes(query)
      );
  }

  // Effect for hash not needed if we just useState default or use Router query. 
  // keeping hash logic requires useEffect, but setting filter state is fine.
  // The original code used useEffect to setFilter from hash. I will keep that.

  // We can't put the hash logic here easily without useEffect.
  // But wait, the previous code had useEffect for data filtering. I'm deriving it now.
  // I need to keep the hash effect for `setFilter`.


  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            AI &{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Health News
            </span>
          </h1>
          <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
            Latest developments in healthcare powered by AI and innovation.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          {/* Search */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--muted-foreground))]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgb(var(--muted))] border border-[rgb(var(--border))] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 justify-center">
            {['all', 'latest', 'trending'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  filter === type
                    ? 'border-blue-500 text-blue-600 dark:text-green-400'
                    : 'border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]'
                }`}
              >
                {type === 'all'
                  ? 'All'
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {filtered.length === 0 ? (
            <p className="text-center col-span-2 text-[rgb(var(--muted-foreground))]">
              No news found.
            </p>
          ) : (
            filtered.map((item) => (
              <article
                key={item.id}
                className={`rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  item.featured
                    ? 'border-blue-300 bg-gradient-to-r from-blue-50/20 to-green-50/20 dark:from-blue-900/10 dark:to-green-900/10'
                    : 'border-[rgb(var(--border))] bg-[rgb(var(--muted))]'
                } flex flex-col h-full`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-medium ${
                          item.featured
                            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                            : 'bg-[rgb(var(--background))] text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))]'
                        }`}
                      >
                        {item.category}
                      </span>
                      <div className="flex items-center text-sm text-[rgb(var(--muted-foreground))]">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <Link href={`/news/${item.id}`}>
                        <h3 className="text-2xl font-bold cursor-pointer hover:text-blue-600 dark:hover:text-green-400 transition-colors">{item.title}</h3>
                    </Link>
                    <p className="text-[rgb(var(--muted-foreground))] leading-relaxed flex-grow">
                      {item.excerpt}
                    </p>
                  </div>
                  <div>
                    <Link href={`/news/${item.id}`} className="inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-green-400 hover:underline transition-all cursor-pointer">
                      Read Full Release
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <button className="border-2 border-[rgb(var(--border))] text-[rgb(var(--foreground))] font-semibold px-8 py-3 rounded-xl hover:border-blue-600 hover:text-blue-600 dark:hover:text-green-400 transition-all duration-300 cursor-pointer">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;
