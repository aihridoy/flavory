import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/service/mongo';

// Define the Recipe schema
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
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

// Create or reuse the Recipe model (prevents overwrite errors in dev)
const Recipe = mongoose.models.recipes || mongoose.model('recipes', recipeSchema);

export async function GET() {
  try {
    // Connect to MongoDB using the dbConnect function
    await dbConnect();

    // Fetch all recipes from the collection
    const recipes = await Recipe.find({}).exec();

    // Return the recipes as JSON
    return NextResponse.json(
      {
        success: true,
        data: recipes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch recipes',
        error: error.message,
      },
      { status: 500 }
    );
  }
}