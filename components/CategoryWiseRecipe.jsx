import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryWiseRecipe = ({ recipe }) => {
  return (
    <Link
        href={`/recipes/${recipe._id}`}
      key={recipe._id.$oid}
      className="card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
    >
      <div className="w-full h-48 overflow-hidden rounded-md">
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={400}      
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="my-2 font-semibold text-gray-800">{recipe.name}</h4>
      <p className="text-sm text-gray-500">
        {recipe.description.substring(0, 80)}...
      </p>
      <div className="py-2 flex justify-between text-xs text-gray-500">
        <span>⭐️ {recipe.rating || "N/A"}</span>
        <span>By: {recipe.author || "Unknown"}</span>
      </div>
    </Link>
  );
};

export default CategoryWiseRecipe;
