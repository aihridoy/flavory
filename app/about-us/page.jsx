/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaHeart, FaStar } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-r from-orange-100 to-yellow-50 py-16 px-6 flex flex-col items-center">
        <motion.h1
          className="text-4xl font-bold text-orange-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to RecipeHub 🍽️
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 max-w-2xl text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover delicious recipes from around the world, crafted with love by
          home cooks and professional chefs alike. Whether you're a beginner or
          a kitchen expert, RecipeHub is here to inspire your next meal!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <FeatureCard
            icon={<FaUtensils />}
            title="Tasty Recipes"
            description="Explore thousands of mouth-watering recipes tailored to your taste."
          />
          <FeatureCard
            icon={<FaHeart />}
            title="Community Love"
            description="Share your recipes and connect with a passionate foodie community."
          />
          <FeatureCard
            icon={<FaStar />}
            title="Top Rated"
            description="Try out the highest-rated dishes loved by home cooks worldwide!"
          />
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href='/categorized' className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-orange-600 transition-all">
            Explore Recipes
          </Link>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center text-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-orange-500 text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
