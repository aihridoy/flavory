"use client";

import { fetchRecipeById } from "@/app/action";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RecipeDetails from "@/components/RecipeDetails";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const { id } = params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    steps
  } = recipe?.data || {};

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) getRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-gray-900"></span>
      </div>
    );
  }
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <>
      <Navbar />
      <main>
        <RecipeDetails recipe={recipe} />
        <section>
          <div className="container py-12">
            <h3 className="font-semibold text-xl py-6">How to Make it</h3>
            {steps?.map((step, index) => (
              <div key={index} className="step">
                <h3>Step {index + 1}</h3>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
