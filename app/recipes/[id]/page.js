/* eslint-disable react/prop-types */
import React from "react";
import { fetchRecipeById } from "@/app/action";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RecipeDetails from "@/components/RecipeDetails";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

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
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                 style={{ background: 'var(--color-primary-50)' }}>
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              Error Loading Recipe
            </h2>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Something went wrong while loading this recipe.
            </p>
            <Link href="/categorized" className="btn-primary">
              Browse All Recipes
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                 style={{ background: 'var(--color-surface-muted)' }}>
              <span className="text-3xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              Recipe Not Found
            </h2>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              The recipe you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/categorized" className="btn-primary">
              Browse All Recipes
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Back Link */}
        <div className="container pt-4 pb-2">
          <Link
            href="/categorized"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <FiArrowLeft size={16} />
            Back to Recipes
          </Link>
        </div>

        <RecipeDetails recipe={recipe} />

        {/* Steps Section */}
        {recipe?.data?.steps && recipe.data.steps.length > 0 && (
          <section className="py-16" style={{ background: 'var(--color-surface-muted)' }}>
            <div className="container max-w-4xl">
              <div className="text-center mb-12">
                <p className="text-sm font-medium uppercase tracking-wider mb-3"
                   style={{ color: 'var(--color-primary)' }}>
                  Step by Step
                </p>
                <h2 className="text-3xl font-bold"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                  How to Make It
                </h2>
              </div>

              <div className="space-y-6">
                {recipe.data.steps.map((step, index) => (
                  <div
                    key={index}
                    className="card p-6 flex gap-5"
                  >
                    <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-lg"
                         style={{ background: 'var(--gradient-primary)', fontFamily: 'var(--font-display)' }}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2"
                          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                        Step {index + 1}
                      </h3>
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default RecipePage;
