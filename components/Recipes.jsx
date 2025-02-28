"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchRecipes } from "@/app/action";
import Recipe from "./Recipe";
import Link from "next/link";

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
      } catch (err) {
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
    <section className="container py-8">
      <div className="grid grid-cols-12 py-4">
        <div className="col-span-12 md:col-span-3">
          <h3 className="font-bold text-xl">Categories</h3>
          {loading ? (
            <p className="text-gray-500 mt-4">Loading categories...</p>
          ) : (
            <ul className="pl-2 my-6 space-y-4 text-gray-500 text-sm">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <li key={index}>
                    <Link href={`/recipes/category/${category}`} className="hover:text-gray-800">{category}</Link>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No categories found.</p>
              )}
            </ul>
          )}
        </div>

        <div className="col-span-12 md:col-span-9">
          {error && <p className="text-red-500">{error}</p>}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
              {[...Array(6)].map((_, index) => (
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                {currentRecipes.map((recipe) => (
                  <Recipe key={recipe._id} recipe={recipe} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={`px-4 py-2 bg-gray-200 rounded-md ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                    }`}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 bg-gray-100 rounded-md">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={`px-4 py-2 bg-gray-200 rounded-md ${
                      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                    }`}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recipes;