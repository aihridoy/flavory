/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchRecipes } from "@/app/action";
import Recipe from "@/components/Recipe";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <main>
        <section className="container py-8">
          <div>
            <h3 className="font-semibold text-xl">Appetizers & Snacks</h3>
            {error && <p className="text-red-500 my-4">{error}</p>}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                {[...Array(12)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="card bg-gray-200 p-4 rounded-lg shadow-md animate-pulse"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-48 bg-gray-300 rounded-md"></div>
                    <div className="h-6 bg-gray-400 my-3 rounded-md w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                  {recipes.slice(0, visibleCount).map((recipe) => (
                    <Recipe key={recipe._id} recipe={recipe} />
                  ))}
                </div>
                {visibleCount < recipes.length && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 12)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;
