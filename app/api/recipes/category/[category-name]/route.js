import { NextResponse } from 'next/server';
import { dbConnect } from '@/service/mongo';
import { Recipe } from '@/models/recipe-model';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const categoryName = decodeURIComponent(params['category-name']);

    const recipes = await Recipe.find({ category: categoryName }).exec();

    if (recipes.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: `No recipes found for category '${categoryName}'`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: recipes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch recipes by category',
        error: error.message,
      },
      { status: 500 }
    );
  }
}