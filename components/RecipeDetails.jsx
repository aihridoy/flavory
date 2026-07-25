/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
"use client";

import { addToFavorites, checkIfFavorited } from "@/app/action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "next-share";
import { FiHeart, FiClock, FiUsers, FiShare2, FiPrinter } from "react-icons/fi";

const RecipeDetails = ({ recipe }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    _id = "",
    name = "",
    category = "",
    description = "",
    image = "",
    serves = "",
    activeTime = "",
    totalTime = "",
    author = "",
    rating = null,
  } = recipe?.data || {};

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (userId && _id) {
        const result = await checkIfFavorited(userId, _id);
        if (result.success) {
          setIsFavorited(result.isFavorited);
        }
      }
    };
    fetchFavoriteStatus();
  }, [userId, _id]);

  const handleAddToFavorites = async () => {
    if (!userId) {
      toast.error("You need to be logged in to add favorites.");
      return;
    }

    const favoriteRecipe = { _id, name, image, author, rating };
    const response = await addToFavorites(userId, favoriteRecipe);

    if (response.success) {
      setIsFavorited(true);
      toast.success("Recipe added to favorites successfully!");
    } else {
      toast.error(response.message);
    }
  };

  const shareUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes/${_id}`;

  return (
    <section className="pt-24 pb-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={image}
                alt={name}
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="badge text-sm px-4 py-1.5">
                  {category}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:sticky lg:top-28">
            {/* Category */}
            <p className="text-sm font-medium uppercase tracking-wider mb-2"
               style={{ color: 'var(--color-primary)' }}>
              {category}
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              {name}
            </h1>

            {/* Author & Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                     style={{ background: 'var(--gradient-primary)' }}>
                  {author?.charAt(0)?.toUpperCase() || "C"}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {author || "Unknown Chef"}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                    Recipe Author
                  </p>
                </div>
              </div>
              {rating && (
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full"
                     style={{ background: 'var(--color-primary-50)' }}>
                  <span>&#11088;</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    {rating}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed mb-8"
               style={{ color: 'var(--color-text-secondary)' }}>
              {description}
            </p>

            {/* Time Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 rounded-xl mb-8"
                 style={{ background: 'var(--color-surface-muted)' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2"
                     style={{ background: 'var(--color-primary-50)' }}>
                  <FiClock size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider mb-1"
                   style={{ color: 'var(--color-text-tertiary)' }}>
                  Prep Time
                </p>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {activeTime || "15 min"}
                </p>
              </div>
              <div className="text-center border-x px-4"
                   style={{ borderColor: 'var(--color-border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2"
                     style={{ background: 'var(--color-primary-50)' }}>
                  <FiClock size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider mb-1"
                   style={{ color: 'var(--color-text-tertiary)' }}>
                  Cook Time
                </p>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {totalTime || "30 min"}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2"
                     style={{ background: 'var(--color-primary-50)' }}>
                  <FiUsers size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider mb-1"
                   style={{ color: 'var(--color-text-tertiary)' }}>
                  Servings
                </p>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {serves || "4"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Favorite Button */}
              <button
                onClick={handleAddToFavorites}
                disabled={isFavorited}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60"
                style={{
                  background: isFavorited ? 'var(--color-primary)' : 'white',
                  color: isFavorited ? 'white' : 'var(--color-primary)',
                  border: isFavorited ? 'none' : '2px solid var(--color-primary)',
                  boxShadow: isFavorited ? '0 4px 20px rgba(232, 77, 53, 0.3)' : 'var(--shadow-sm)',
                }}
              >
                <FiHeart size={20} fill={isFavorited ? "currentColor" : "none"} />
                <span>{isFavorited ? "Saved to Favorites" : "Add to Favorites"}</span>
              </button>
            </div>

            {/* Share Section */}
            <div className="mt-6 p-4 rounded-xl flex items-center justify-between"
                 style={{ background: 'var(--color-surface-muted)' }}>
              <div className="flex items-center gap-2">
                <FiShare2 size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  Share this recipe
                </span>
              </div>
              <div className="flex gap-2">
                <FacebookShareButton url={shareUrl} hashtag={name}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                       style={{ background: 'white', boxShadow: 'var(--shadow-sm)' }}>
                    <FacebookIcon size={20} round={false} />
                  </div>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} hashtag={name}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                       style={{ background: 'white', boxShadow: 'var(--shadow-sm)' }}>
                    <TwitterIcon size={20} round={false} />
                  </div>
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} hashtag={name} separator=":: ">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                       style={{ background: 'white', boxShadow: 'var(--shadow-sm)' }}>
                    <WhatsappIcon size={20} round={false} />
                  </div>
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        toastStyle={{
          borderRadius: '12px',
          background: 'var(--color-surface)',
          boxShadow: 'var(--shadow-lg)',
        }}
      />
    </section>
  );
};

export default RecipeDetails;
