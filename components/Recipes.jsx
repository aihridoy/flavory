"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchRecipes } from "@/app/action";
import Image from "next/image";
import Recipe from "./Recipe";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <section className="container py-8">
      <div className="grid grid-cols-12 py-4">
        <div className="col-span-12 md:col-span-3">
          <h3 className="font-bold text-xl">Recipes</h3>
          <ul className="pl-2 my-6 space-y-4 text-gray-500 text-sm">
            <li>
              <a href="#">Morning Bliss Café</a>
            </li>
            <li>
              <a href="#">Sunrise Bites Kitchen</a>
            </li>
            <li>
              <a href="#">Brunch Haven Delights</a>
            </li>
            <li>
              <a href="#">Rise & Dine Eatery</a>
            </li>
            <li>
              <a href="#">Breakfast Oasis Junction</a>
            </li>
          </ul>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
              {recipes.map((recipe) => {
                return <Recipe recipe={recipe} />;
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recipes;
