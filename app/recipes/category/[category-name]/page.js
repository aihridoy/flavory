/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import { fetchRecipesByCategory } from "@/app/action";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import CategoryWiseRecipe from "@/components/CategoryWiseRecipe";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const Page = ({ params }) => {
  const { "category-name": categoryName } = params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const result = await fetchRecipesByCategory(categoryName);
        if (result.success) {
          setRecipes(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [categoryName]);

  const displayName = decodeURIComponent(categoryName);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16" style={{ background: 'var(--color-surface-muted)' }}>
        <section className="container">
          {/* Back Link */}
          <Link
            href="/categorized"
            className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors duration-200"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <FiArrowLeft size={16} />
            Back to All Recipes
          </Link>

          {/* Page Header */}
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-wider mb-2"
               style={{ color: 'var(--color-primary)' }}>
              Category
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              {displayName} Recipes
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Discover our collection of {displayName.toLowerCase()} recipes
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-32">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 animate-spin"
                     style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-primary)' }} />
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl mb-6 text-sm"
                 style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
              {error}
            </div>
          )}

          {!loading && !error && recipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.slice(0, visibleCount).map((recipe, index) => (
                  <motion.div
                    key={recipe._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <CategoryWiseRecipe recipe={recipe} />
                  </motion.div>
                ))}
              </div>

              {visibleCount < recipes.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="btn-primary"
                  >
                    Load More Recipes
                  </button>
                </div>
              )}
            </>
          ) : (
            !loading && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                     style={{ background: 'var(--color-surface-muted)' }}>
                  <span className="text-3xl">🍳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                  No Recipes Found
                </h3>
                <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  We couldn&apos;t find any recipes in this category.
                </p>
                <Link href="/categorized" className="btn-primary">
                  Browse All Recipes
                </Link>
              </div>
            )
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;
