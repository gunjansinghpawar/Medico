"use client";

import { useEffect, useState } from "react";
import { Calendar, ArrowRight, Search } from "lucide-react";

const pressReleases = [
  {
    id: 1,
    title: "AI Detects Rare Diseases With Breakthrough Speed",
    date: "2025-06-05",
    excerpt:
      "New algorithms allow early detection of conditions previously difficult to diagnose.",
    category: "AI Health",
    featured: true,
  },
  {
    id: 2,
    title: "Wearable Health Monitors Now Use Generative AI",
    date: "2025-05-28",
    excerpt:
      "Smart health devices are now powered by AI that predicts symptoms before they appear.",
    category: "Technology",
  },
  {
    id: 3,
    title: "Open Source AI Models for Global Health Launched",
    date: "2025-05-10",
    excerpt:
      "Developers worldwide can now contribute to medical AI to fight diseases at scale.",
    category: "Global Impact",
  },
  {
    id: 4,
    title: "AI Surpasses Doctors in Early Cancer Screening Accuracy",
    date: "2025-04-22",
    excerpt:
      "Clinical trials show AI models outperform traditional screenings in early cancer detection.",
    category: "Research",
    featured: true,
  },
];

const News = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [filtered, setFiltered] = useState(pressReleases);

  // Set filter based on hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#latest") setFilter("latest");
    else if (hash === "#trending") setFilter("trending");
    else setFilter("all");
  }, []);

  useEffect(() => {
    let data = [...pressReleases];

    // Filtering logic
    if (filter === "trending") {
      data = data.filter((item) => item.featured);
    } else if (filter === "latest") {
      data = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    // Search logic
    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.excerpt.toLowerCase().includes(query)
      );
    }

    setFiltered(data);
  }, [filter, search]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            AI &{" "}
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
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgb(var(--muted))]/40 border border-[rgb(var(--border))] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 justify-center">
            {["all", "latest", "trending"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  filter === type
                    ? "border-blue-500 text-blue-600 dark:text-green-400"
                    : "border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]"
                }`}
              >
                {type === "all"
                  ? "All"
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
                    ? "border-blue-300 bg-gradient-to-r from-blue-50/20 to-green-50/20 dark:from-blue-900/10 dark:to-green-900/10"
                    : "border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30"
                }`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-medium ${
                          item.featured
                            ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                            : "bg-[rgb(var(--background))] text-[rgb(var(--muted-foreground))] border border-[rgb(var(--border))]"
                        }`}
                      >
                        {item.category}
                      </span>
                      <div className="flex items-center text-sm text-[rgb(var(--muted-foreground))]">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <div>
                    <button className="inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-green-400 hover:underline transition-all">
                      Read Full Release
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <button className="border-2 border-[rgb(var(--border))] text-[rgb(var(--foreground))] font-semibold px-8 py-3 rounded-xl hover:border-blue-600 hover:text-blue-600 dark:hover:text-green-400 transition-all duration-300">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;
