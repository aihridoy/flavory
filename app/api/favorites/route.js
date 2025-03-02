import { dbConnect } from '@/service/mongo';
import { Favorite } from '@/models/favorite-model';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, image, author, rating } = body;

    if (!userId || !name || !image || !author || rating == null) {
      return new Response(
        JSON.stringify({ message: 'All fields are required.' }),
        { status: 400 }
      );
    }

    await dbConnect();

    const existingFavorite = await Favorite.findOne({ userId, name });
    if (existingFavorite) {
      return new Response(
        JSON.stringify({ message: 'Recipe already in favorites.' }),
        { status: 409 }
      );
    }

    const newFavorite = await Favorite.create({ userId, name, image, author, rating });

    return new Response(
      JSON.stringify({
        message: 'Recipe added to favorites successfully.',
        data: newFavorite,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('🔥 Error adding to favorites:', error.message);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('userId');
      const name = searchParams.get('name');
  
      if (!userId || !name) {
        return new Response(
          JSON.stringify({ message: 'userId and name are required.' }),
          { status: 400 }
        );
      }
  
      await dbConnect();
  
      const favorite = await Favorite.findOne({ userId, name });
  
      return new Response(
        JSON.stringify({
          isFavorited: !!favorite, // Returns true if found, false if not
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error('🔥 Error fetching favorite status:', error.message);
      return new Response(
        JSON.stringify({ message: 'Internal server error.' }),
        { status: 500 }
      );
    }
  }