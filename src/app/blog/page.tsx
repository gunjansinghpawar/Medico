'use client';

import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';

type BlogPost = {
    id: number;
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
    const featuredPost: BlogPost = {
        id: 1,
        title: "The Future of AI in Healthcare: Transforming Patient Care",
        excerpt: "Explore how artificial intelligence is revolutionizing healthcare delivery...",
        author: "Dr. Sarah Johnson",
        date: "March 15, 2025",
        readTime: "8 min read",
        category: "AI & Healthcare",
        image: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: true
    };

    const allPosts: BlogPost[] = [
        featuredPost,
        {
            id: 2,
            title: "Understanding Symptoms: When to Seek Medical Attention",
            excerpt: "Learn to distinguish between common symptoms...",
            author: "Dr. Michael Chen",
            date: "March 12, 2025",
            readTime: "6 min read",
            category: "Health Tips",
            image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 3,
            title: "Mental Health in the Digital Age: Finding Balance",
            excerpt: "Discover strategies for maintaining mental wellness...",
            author: "Dr. Emily Rodriguez",
            date: "March 10, 2025",
            readTime: "7 min read",
            category: "Mental Health",
            image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 4,
            title: "Preventive Care: Your First Line of Defense",
            excerpt: "Why regular check-ups and preventive measures are crucial...",
            author: "Dr. James Wilson",
            date: "March 8, 2025",
            readTime: "5 min read",
            category: "Prevention",
            image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 5,
            title: "Nutrition Myths Debunked: Evidence-Based Eating",
            excerpt: "Separating fact from fiction in the world of nutrition...",
            author: "Dr. Lisa Thompson",
            date: "March 5, 2025",
            readTime: "9 min read",
            category: "Nutrition",
            image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 6,
            title: "Exercise and Immunity: Building Your Body's Defenses",
            excerpt: "How regular physical activity strengthens your immune system...",
            author: "Dr. Robert Kim",
            date: "March 3, 2025",
            readTime: "6 min read",
            category: "Fitness",
            image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            id: 7,
            title: "Sleep Science: Optimizing Your Rest for Better Health",
            excerpt: "Understanding the science of sleep and practical tips...",
            author: "Dr. Amanda Foster",
            date: "March 1, 2025",
            readTime: "8 min read",
            category: "Sleep Health",
            image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ];

    const categories = [
        "All Posts",
        "AI & Healthcare",
        "Health Tips",
        "Mental Health",
        "Prevention",
        "Nutrition",
        "Fitness",
        "Sleep Health"
    ];

    const [selectedCategory, setSelectedCategory] = useState("All Posts");

    const filteredPosts = selectedCategory === "All Posts"
        ? allPosts.filter(p => !p.featured)
        : allPosts.filter(p => p.category === selectedCategory);

    return (
        <div className="pt-16 bg-background text-foreground">
            {/* Hero Section */}
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
                            className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 border ${
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

            {/* Featured Post - only shown if "All Posts" is selected */}
            {selectedCategory === "All Posts" && (
                <div className="container mx-auto px-4 md:px-6 mb-16">
                    <div className="rounded-3xl shadow-xl border border-muted bg-card overflow-hidden">
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
                                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
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
                                    <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold px-6 py-2 rounded-xl hover:from-blue-700 hover:to-green-700 transition">
                                        <span className="flex items-center gap-2">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Blog Grid */}
            <div className="container mx-auto px-4 md:px-6 pb-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => (
                        <article key={post.id} className="bg-card rounded-2xl shadow-md border border-muted hover:shadow-xl transition overflow-hidden group">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 dark:bg-black/60 px-3 py-1 rounded-full text-sm font-medium">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center text-muted-foreground text-sm mb-2">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {post.readTime}
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                                <div className="flex items-center justify-between">
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
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                                        Read <ArrowRight className="w-4 h-4" />
                                    </button>
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
