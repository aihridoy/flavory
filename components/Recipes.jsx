"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchRecipes } from "@/app/action";
import Recipe from "./Recipe";
import Link from "next/link";
import { FiGrid, FiList, FiArrowRight } from "react-icons/fi";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const result = await fetchRecipes();
        if (result.success) {
          setRecipes(result.data);
        } else {
          setError(result.message);
        }
      } catch {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, []);

  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

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
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 skeleton rounded-lg" />
                  ))}
                </div>
              ) : (
                <ul className="space-y-1">
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          href={`/recipes/category/${category}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full"
                                style={{ background: 'var(--color-primary)' }} />
                          {category}
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
                  {currentRecipes.map((recipe, index) => (
                    <motion.div
                      key={recipe._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Recipe recipe={recipe} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: currentPage === 1 ? 'var(--color-surface-muted)' : 'white',
                        color: 'var(--color-text-secondary)',
                        boxShadow: currentPage === 1 ? 'none' : 'var(--shadow-sm)',
                      }}
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className="w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200"
                          style={{
                            background: currentPage === i + 1 ? 'var(--gradient-primary)' : 'white',
                            color: currentPage === i + 1 ? 'white' : 'var(--color-text-secondary)',
                            boxShadow: currentPage === i + 1 ? '0 4px 15px rgba(232, 77, 53, 0.3)' : 'var(--shadow-sm)',
                          }}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: currentPage === totalPages ? 'var(--color-surface-muted)' : 'white',
                        color: 'var(--color-text-secondary)',
                        boxShadow: currentPage === totalPages ? 'none' : 'var(--shadow-sm)',
                      }}
                    >
                      Next
                    </button>
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
