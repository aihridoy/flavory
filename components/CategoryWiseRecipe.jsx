import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiClock, FiUser } from "react-icons/fi";

const CategoryWiseRecipe = ({ recipe }) => {
  return (
    <Link
      href={`/recipes/${recipe._id}`}
      className="card group block"
    >
      {/* Image Container */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold"
             style={{ color: 'var(--color-primary)' }}>
          <span>&#11088;</span>
          <span>{recipe.rating || "New"}</span>
        </div>

        {/* Quick View on Hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                style={{ background: 'var(--gradient-primary)' }}>
            View Recipe
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h4 className="font-semibold text-lg mb-2 line-clamp-2 transition-colors duration-200 group-hover:text-[var(--color-primary)]"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
          {recipe.name}
        </h4>

        {/* Description */}
        <p className="text-sm line-clamp-2 mb-4"
           style={{ color: 'var(--color-text-secondary)' }}>
          {recipe.description?.substring(0, 100)}...
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-3 border-t"
             style={{ borderColor: 'var(--color-border-light)' }}>
          <div className="flex items-center gap-1.5 text-xs"
               style={{ color: 'var(--color-text-tertiary)' }}>
            <FiUser size={12} />
            <span>{recipe.author || "Unknown Chef"}</span>
          </div>
          {recipe.totalTime && (
            <div className="flex items-center gap-1.5 text-xs"
                 style={{ color: 'var(--color-text-tertiary)' }}>
              <FiClock size={12} />
              <span>{recipe.totalTime}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategoryWiseRecipe;
