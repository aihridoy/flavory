/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaHeart, FaStar, FaUsers, FaGlobe, FaAward } from "react-icons/fa";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const features = [
    {
      icon: <FaUtensils />,
      title: "Curated Recipes",
      description: "Every recipe is tested and approved by our team of culinary experts to ensure perfect results.",
    },
    {
      icon: <FaHeart />,
      title: "Made with Love",
      description: "Join a passionate community of home cooks sharing their favorite family recipes.",
    },
    {
      icon: <FaStar />,
      title: "Top Rated",
      description: "Try the highest-rated dishes loved by home cooks from around the world.",
    },
  ];

  const stats = [
    { icon: <FaUsers />, value: "100K+", label: "Happy Cooks" },
    { icon: <FaUtensils />, value: "50", label: "Recipes" },
    { icon: <FaGlobe />, value: "10", label: "Categories" },
    { icon: <FaAward />, value: "4.9", label: "Average Rating" },
  ];

  const values = [
    "Test every recipe before publishing",
    "Clear, step-by-step instructions",
    "Nutritional information included",
    "Community-driven recipe sharing",
    "Regular content updates",
    "Mobile-friendly experience",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-primary)', opacity: 0.05 }} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge mb-6 inline-flex">
                Our Story
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                The Flavor Behind{" "}
                <span style={{ color: 'var(--color-primary)' }}>Flavory</span>
              </h1>
              <p className="text-lg leading-relaxed mb-8"
                 style={{ color: 'var(--color-text-secondary)' }}>
                We believe cooking should be accessible, enjoyable, and shared with loved ones.
                Flavory was born from a passion for bringing people together through delicious food.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                     style={{ background: 'var(--color-primary-50)' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>
                    {stat.icon}
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1"
                   style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-wider mb-3"
               style={{ color: 'var(--color-primary)' }}>
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              Cook with Confidence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card p-8 text-center hover-lift"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl"
                     style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider mb-3"
                 style={{ color: 'var(--color-primary)' }}>
                Our Promise
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                Quality in Every Recipe
              </h2>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                We take pride in delivering recipes that work. Every dish is thoroughly tested,
                photographed, and documented to ensure your success in the kitchen.
              </p>

              <div className="space-y-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ background: 'var(--color-primary)' }}>
                      <FiCheck size={14} className="text-white" />
                    </div>
                    <span style={{ color: 'var(--color-text-primary)' }}>{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="card p-8"
                   style={{ background: 'var(--gradient-primary)' }}>
                <h3 className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: 'var(--font-display)' }}>
                  Ready to Start Cooking?
                </h3>
                <p className="text-white/90 mb-6">
                  Join thousands of home cooks who have discovered their new favorite recipes on Flavory.
                </p>
                <Link
                  href="/categorized"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white transition-all duration-300 hover:scale-105"
                  style={{ color: 'var(--color-primary)', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
                >
                  Explore Recipes
                  <FiArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
