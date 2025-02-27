import Image from "next/image";
import Link from "next/link";
import React from "react";

const Recipe = ({ recipe }) => {
  return (
    <Link
      key={recipe?._id}
      href={`/recipes/${recipe?._id}`}
      className="card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
    >
      <div className="w-full h-48 overflow-hidden rounded-md">
        <Image
          src={recipe?.thumbnail}
          width={300}
          height={200}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <h4 className="my-2 font-semibold text-gray-800">{recipe?.name}</h4>
      <div className="py-2 flex justify-between text-xs text-gray-500">
        <span>⭐️ {recipe?.rating}</span>
        <span>By: {recipe?.author}</span>
      </div>
    </Link>
  );
};

export default Recipe;
