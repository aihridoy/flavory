/* eslint-disable react/prop-types */
import React from "react";
import { fetchRecipeById } from "@/app/action";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RecipeDetails from "@/components/RecipeDetails";

export async function generateMetadata({ params }) {
  const { id } = params;
  try {
    const recipe = await fetchRecipeById(id);
    return {
      title: recipe?.data?.name?.slice(0, 50) || "Recipe Details",
      description: recipe?.data?.description?.slice(0, 100) || "View this delicious recipe.",
      openGraph: {
        images: [{ url: recipe?.data?.image }]
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Recipe Not Found",
      description: "The requested recipe could not be found.",
    };
  }
}

const RecipePage = async ({ params }) => {
  const { id } = params;

  let recipe;
  try {
    recipe = await fetchRecipeById(id);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return <p className="text-center text-red-500">Error loading recipe.</p>;
  }

  if (!recipe) return <p className="text-center text-gray-500">Recipe not found.</p>;

  return (
    <>
      <Navbar />
      <main>
        <RecipeDetails recipe={recipe} />
        <section>
          <div className="container py-12">
            <h3 className="font-semibold text-xl py-6">How to Make it</h3>
            {recipe?.data?.steps?.map((step, index) => (
              <div key={index} className="step mb-4">
                <h3 className="text-lg font-semibold">Step {index + 1}</h3>
                <p className="text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RecipePage;