import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  author: String,
  activeTime: String,
  totalTime: String,
  thumbnail: String,
  image: String,
  category: String,
  serves: Number,
  rating: Number,
  steps: [String],
}, { timestamps: true });

export const Recipe = mongoose.models.recipes ?? mongoose.model('recipes', recipeSchema);