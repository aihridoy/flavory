/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import { fetchRecipesByCategory } from "@/app/action";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import CategoryWiseRecipe from "@/components/CategoryWiseRecipe";

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

  return (
    <>
      <Navbar />
      <main>
        <section className="container py-8">
          <div>
            <h3 className="font-semibold text-2xl text-gray-800">
              {decodeURIComponent(categoryName)} Recipes
            </h3>

            {loading && (
              <div className="flex justify-center items-center mt-32 mb-32">
                <span className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-gray-900"></span>
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 my-6">{error}</div>
            )}

            {!loading && !error && recipes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">
                  {recipes.slice(0, visibleCount).map((recipe) => (
                    <CategoryWiseRecipe key={recipe._id} recipe={recipe} />
                  ))}
                </div>

                {visibleCount < recipes.length && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 8)} // Show 8 more
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            ) : (
              !loading && (
                <p className="text-center text-gray-500 my-6">
                  No recipes found in this category.
                </p>
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;