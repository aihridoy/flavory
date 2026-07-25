/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fetchRecipes, fetchCategories } from "@/app/action";
import Recipe from "@/components/Recipe";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiGrid, FiSearch, FiX, FiChevronDown } from "react-icons/fi";

const SORT_OPTIONS = [
  { value: "top", label: "Top Rated" },
  { value: "name", label: "A - Z" },
  { value: "quick", label: "Quickest to Make" },
];

const Page = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const sentinelRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [recipesResult, categoriesResult] = await Promise.all([
          fetchRecipes(),
          fetchCategories(),
        ]);
        if (recipesResult.success) {
          setRecipes(recipesResult.data);
        } else {
          setError(recipesResult.message);
        }
        if (categoriesResult.success) {
          setCategories(categoriesResult.data);
        }
      } catch {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const parseMinutes = (time) => {
    const match = /(\d+(\.\d+)?)/.exec(time || "");
    if (!match) return Infinity;
    const value = parseFloat(match[1]);
    return /hr/i.test(time) ? value * 60 : value;
  };

  const filteredRecipes = useMemo(() => {
    let list = recipes;

    if (activeCategory !== "All") {
      list = list.filter((r) => r.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.name?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.author?.toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    if (sortBy === "top") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "quick") {
      sorted.sort((a, b) => parseMinutes(a.totalTime) - parseMinutes(b.totalTime));
    }

    return sorted;
  }, [recipes, activeCategory, search, sortBy]);

  // Reset pagination whenever the filtered set changes
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, search, sortBy]);

  // Infinite scroll: grow visibleCount as the sentinel enters view
  useEffect(() => {
    if (loading) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            prev < filteredRecipes.length ? prev + 12 : prev
          );
        }
      },
      { threshold: 0.1, rootMargin: "150px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loading, filteredRecipes.length]);

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecipes.length;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--color-surface-muted)' }}>
        <section className="container">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <FiGrid size={18} style={{ color: 'var(--color-primary)' }} />
              <p className="text-sm font-medium uppercase tracking-wider"
                 style={{ color: 'var(--color-primary)' }}>
                All Recipes
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              Explore Our Collection
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Browse, search, and filter through our curated selection of delicious recipes
            </p>
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes, chefs, or ingredients..."
                className="input-field pl-12 pr-10"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
            <div className="relative sm:w-56">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field appearance-none pr-10 w-full"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <FiChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("All")}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === "All" ? "var(--gradient-primary)" : "white",
                color: activeCategory === "All" ? "white" : "var(--color-text-secondary)",
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              All ({recipes.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat.name ? "var(--gradient-primary)" : "white",
                  color: activeCategory === cat.name ? "white" : "var(--color-text-secondary)",
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {error && (
            <div className="p-4 rounded-xl mb-6 text-sm"
                 style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden"
                     style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="h-48 skeleton" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 skeleton rounded w-1/3" />
                    <div className="h-6 skeleton rounded w-3/4" />
                    <div className="h-4 skeleton rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : visibleRecipes.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                   style={{ background: 'white' }}>
                <span className="text-3xl">🍳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                No recipes found
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Try a different search term or category.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleRecipes.map((recipe, index) => (
                  <motion.div
                    key={recipe._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min((index % 12) * 0.05, 0.3) }}
                  >
                    <Recipe recipe={recipe} />
                  </motion.div>
                ))}
              </div>

              {hasMore ? (
                <div ref={sentinelRef} className="flex justify-center items-center py-10">
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" style={{ color: 'var(--color-primary)' }}>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Loading more recipes...</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p style={{ color: 'var(--color-text-tertiary)' }}>
                    You've seen all {filteredRecipes.length} recipes!
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;
