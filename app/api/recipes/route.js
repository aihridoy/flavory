import { NextResponse } from 'next/server';
import { dbConnect } from '@/service/mongo';
import { Recipe } from '@/models/recipe-model';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const fetchAll = limit === 0;
    const skip = (page - 1) * limit;

    const query = Recipe.find({});
    if (!fetchAll) query.skip(skip).limit(limit);
    const recipes = await query.exec();
    const total = await Recipe.countDocuments();
    
    return NextResponse.json(
      {
        success: true,
        data: recipes,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: skip + recipes.length < total,
        },
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