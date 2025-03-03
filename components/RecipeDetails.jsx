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

const RecipeDetails = ({ recipe }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    _id="",
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
      if (userId && name) {
        const result = await checkIfFavorited(userId, name);
        if (result.success) {
          setIsFavorited(result.isFavorited);
        }
      }
    };

    fetchFavoriteStatus();
  }, [userId, name]);

  const handleAddToFavorites = async () => {
    if (!userId) {
      toast.error("You need to be logged in to add favorites.");
      return;
    }

    const favoriteRecipe = {
      name,
      image,
      author,
      rating,
    };

    const response = await addToFavorites(userId, favoriteRecipe);

    if (response.success) {
      setIsFavorited(true);
      toast.success("Recipe added to favorites successfully!");
    } else {
      toast.error(response.message);
    }
  };

  // URL to share (current page URL)
  const shareUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes/${_id}`


  return (
    <section>
      <div className="grid grid-cols-12 container gap-8 justify-items-center">
        <div className="col-span-12 md:col-span-6">
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            className="w-full h-full rounded-lg object-contain"
          />
        </div>
        <div className="col-span-12 md:col-span-6 py-8 flex flex-col justify-center">
          <h2 className="font-semibold text-4xl lg:w-8/12 leading-10">
            {name}
          </h2>
          <p className="text-xs text-[#eb4a36] italic my-2">{category}</p>
          <p className="text-gray-600 text-sm my-6 leading-6">{description}</p>

          <div className="flex gap-4 justify-center divide-x my-12">
            <div className="flex-1 text-center">
              <h3 className="font-medium text-lg text-gray-700 mt-2">
                Prep time
              </h3>
              <p className="text-gray-500 text-sm">{activeTime}</p>
            </div>
            <div className="flex-1 text-center">
              <h3 className="font-medium text-lg text-gray-700 mt-2">
                Cook time
              </h3>
              <p className="text-gray-500 text-sm">{totalTime}</p>
            </div>
            <div className="flex-1 text-center">
              <h3 className="font-medium text-lg text-gray-700 mt-2">
                Servings
              </h3>
              <p className="text-gray-500 text-sm">{serves}</p>
            </div>
          </div>

          <div className="flex gap-6 justify-between items-center bg-gray-50 p-4 rounded-lg shadow-lg">
            {/* Favorite Button */}
            <button
              className={`flex items-center gap-2 text-lg font-medium cursor-pointer transition-colors duration-300 
              ${isFavorited ? "text-red-500" : "text-gray-600 hover:text-[#eb4a36]"}`}
              onClick={handleAddToFavorites}
              disabled={isFavorited}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
              <span>{isFavorited ? "Favorited" : "Favorite"}</span>
            </button>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-4">
              <p className="text-lg font-medium text-gray-700">Share On:</p>
              <div className="flex gap-4">
                <FacebookShareButton
                  url={shareUrl}
                  hashtag="#recipe"
                >
                  <FacebookIcon
                    className="transition-transform transform hover:scale-110"
                    size={28}
                    round
                  />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon
                    className="transition-transform transform hover:scale-110"
                    size={28}
                    round
                  />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  separator=":: "
                >
                  <WhatsappIcon
                    className="transition-transform transform hover:scale-110"
                    size={28}
                    round
                  />
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default RecipeDetails;
