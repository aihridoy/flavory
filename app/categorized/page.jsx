/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchRecipes } from "@/app/action";
import Recipe from "@/components/Recipe";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiGrid, FiFilter } from "react-icons/fi";

const Page = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

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

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--color-surface-muted)' }}>
        <section className="container">
          {/* Page Header */}
          <div className="mb-10">
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
              Browse through our curated selection of delicious recipes
            </p>
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
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.slice(0, visibleCount).map((recipe, index) => (
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

              {visibleCount < recipes.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="btn-primary"
                  >
                    Load More Recipes
                  </button>
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
