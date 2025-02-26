import { NextResponse } from 'next/server';
import { dbConnect } from '@/service/mongo';
import { Recipe } from '@/models/recipe-model';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const recipe = await Recipe.findById(params.id).exec();

    if (!recipe) {
      return NextResponse.json(
        {
          success: false,
          message: `Recipe with ID ${params.id} not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: recipe,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch recipe',
        error: error.message,
      },
      { status: 500 }
    );
  }
}