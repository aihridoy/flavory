/* eslint-disable react/prop-types */
import { addToFavorites, checkIfFavorited } from "@/app/action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeDetails = ({ recipe }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
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
          <h2 className="font-semibold text-4xl lg:w-8/12 leading-10">{name}</h2>
          <p className="text-xs text-[#eb4a36] italic my-2">{category}</p>
          <p className="text-gray-600 text-sm my-6 leading-6">{description}</p>

          <div className="flex gap-4 justify-center divide-x my-12">
            <div className="flex-1 text-center">
              <h3 className="font-medium text-lg text-gray-700 mt-2">Prep time</h3>
              <p className="text-gray-500 text-sm">{activeTime}</p>
            </div>
            <div className="flex-1 text-center">
              <h3 className="font-medium text-lg text-gray-700 mt-2">Cook time</h3>
              <p className="text-gray-500 text-sm">{totalTime}</p>
            </div>
            <div className="flex-1 text-center">
              <h3 className="font-medium text-lg text-gray-700 mt-2">Servings</h3>
              <p className="text-gray-500 text-sm">{serves}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              className={`flex gap-2 text-gray-600 cursor-pointer hover:text-[#eb4a36] ${
                isFavorited ? "text-red-500" : ""
              }`}
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
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
              <span>{isFavorited ? "Favorited" : "Favourite"}</span>
            </button>

            <div className="flex gap-2 text-gray-600 cursor-pointer hover:text-[#0E79F6]">
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
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M8.7 10.7l6.6 -3.4" />
                <path d="M8.7 13.3l6.6 3.4" />
              </svg>
              <span>Share</span>
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