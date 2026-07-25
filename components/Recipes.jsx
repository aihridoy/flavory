"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { fetchRecipesPaginated, fetchCategories } from "@/app/action";
import Recipe from "./Recipe";
import Link from "next/link";
import { FiGrid } from "react-icons/fi";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const observerRef = useRef(null);
  const lastRecipeRef = useRef(null);

  // Initial load
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const result = await fetchRecipesPaginated(1, 12);
        if (result.success) {
          setRecipes(result.data);
          setHasMore(result.pagination.hasMore);
        } else {
          setError(result.message);
        }
      } catch {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    const getCategories = async () => {
      try {
        const result = await fetchCategories();
        if (result.success) {
          setCategories(result.data);
        }
      } finally {
        setCategoriesLoading(false);
      }
    };
    getRecipes();
    getCategories();
  }, []);

  // Load more recipes
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const result = await fetchRecipesPaginated(nextPage, 12);
      if (result.success) {
        setRecipes((prev) => [...prev, ...result.data]);
        setPage(nextPage);
        setHasMore(result.pagination.hasMore);
      }
    } catch {
      setError("Failed to load more recipes");
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observerRef.current = observer;

    if (lastRecipeRef.current) {
      observer.observe(lastRecipeRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, loadingMore, loadMore]);

  // Update observer when recipes change
  useEffect(() => {
    if (observerRef.current && lastRecipeRef.current) {
      observerRef.current.unobserve(lastRecipeRef.current);
      observerRef.current.observe(lastRecipeRef.current);
    }
  }, [recipes]);

  return (
    <section className="py-16" style={{ background: 'var(--color-surface-muted)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider mb-3"
             style={{ color: 'var(--color-primary)' }}>
            Our Collection
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            Trending Recipes
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }} className="max-w-lg mx-auto">
            Explore our most popular recipes loved by thousands of home cooks worldwide.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Categories Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-24 bg-white rounded-xl p-6"
                 style={{ boxShadow: 'var(--shadow-card)' }}>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"
                  style={{ color: 'var(--color-text-primary)' }}>
                <FiGrid size={18} style={{ color: 'var(--color-primary)' }} />
                Categories
              </h3>
              {categoriesLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 skeleton rounded-lg" />
                  ))}
                </div>
              ) : (
                <ul className="space-y-1">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <li key={category.name}>
                        <Link
                          href={`/recipes/category/${category.name}`}
                          className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full"
                                  style={{ background: 'var(--color-primary)' }} />
                            {category.name}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                            {category.count}
                          </span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                      No categories found.
                    </p>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="col-span-12 lg:col-span-9">
            {error && (
              <div className="p-4 rounded-lg mb-6 text-sm"
                   style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
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
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recipes.map((recipe, index) => {
                    const isLast = index === recipes.length - 1;
                    return (
                      <motion.div
                        key={recipe._id}
                        ref={isLast ? lastRecipeRef : null}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                      >
                        <Recipe recipe={recipe} />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Loading More Indicator */}
                {loadingMore && (
                  <div className="flex justify-center items-center py-8">
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Loading more recipes...</span>
                    </div>
                  </div>
                )}

                {/* End of Results */}
                {!hasMore && recipes.length > 0 && (
                  <div className="text-center py-8">
                    <p style={{ color: 'var(--color-text-tertiary)' }}>
                      You&apos;ve seen all {recipes.length} recipes!
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipes;
