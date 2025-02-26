import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/service/mongo';
import { Recipe } from '@/models/recipe-model';

export async function GET() {
  try {
    await dbConnect();
    const recipes = await Recipe.find({}).exec();
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