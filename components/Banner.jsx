import React from "react";
import Link from "next/link";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";

const Banner = () => {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/images/cover.png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Clean dark gradient from left to right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.85) 40%, rgba(17,24,39,0.4) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Content - Vertically Centered */}
      <div className="container relative z-10 w-full">
        <div className="max-w-xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(232,77,53,0.15)",
              border: "1px solid rgba(232,77,53,0.3)",
            }}
          >
            <FiBookOpen size={14} style={{ color: "#FF6B54" }} />
            <span className="text-sm font-medium" style={{ color: "#FF6B54" }}>
              100+ Recipes Across 10 Categories
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Discover Your Next Favorite Recipe
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-md">
            Explore thousands of delicious recipes from around the world.
            Cook, share, and discover your next culinary adventure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Link
              href="/categorized"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
              style={{
                background: "var(--gradient-primary)",
                color: "white",
              }}
            >
              Explore Recipes
              <FiArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-white border border-white/25 transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-10">
            <div>
              <p
                className="text-2xl sm:text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                100+
              </p>
              <p className="text-sm text-gray-400">Recipes</p>
            </div>
            <div className="pl-6 sm:pl-10 border-l border-white/20">
              <p
                className="text-2xl sm:text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                10
              </p>
              <p className="text-sm text-gray-400">Categories</p>
            </div>
            <div className="pl-6 sm:pl-10 border-l border-white/20">
              <p
                className="text-2xl sm:text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                100K+
              </p>
              <p className="text-sm text-gray-400">Happy Cooks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
