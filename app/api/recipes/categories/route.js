import { NextResponse } from 'next/server';
import { dbConnect } from '@/service/mongo';
import { Recipe } from '@/models/recipe-model';

export async function GET() {
  try {
    await dbConnect();

    const categories = await Recipe.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json(
      {
        success: true,
        data: categories.map((c) => ({ name: c._id, count: c.count })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories', error: error.message },
      { status: 500 }
    );
  }
}
