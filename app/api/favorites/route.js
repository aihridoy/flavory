import { dbConnect } from '@/service/mongo';
import { Favorite } from '@/models/favorite-model';
import { Recipe } from '@/models/recipe-model';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, recipeId, name, image, author, rating } = body;

    if (!userId || !recipeId || !name || !image || !author || rating == null) {
      return new Response(
        JSON.stringify({ message: 'All fields are required.' }),
        { status: 400 }
      );
    }

    await dbConnect();

    const existingFavorite = await Favorite.findOne({ userId, recipeId });
    if (existingFavorite) {
      return new Response(
        JSON.stringify({ message: 'Recipe already in favorites.' }),
        { status: 409 }
      );
    }

    const newFavorite = await Favorite.create({ userId, recipeId, name, image, author, rating });

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
    const recipeId = searchParams.get('recipeId');

    if (!userId) {
      return new Response(
        JSON.stringify({ message: 'userId is required.' }),
        { status: 400 }
      );
    }

    await dbConnect();

    // Single-recipe check: /api/favorites?userId=...&recipeId=...
    if (recipeId) {
      const favorite = await Favorite.findOne({ userId, recipeId });
      return new Response(
        JSON.stringify({ isFavorited: !!favorite, favoriteId: favorite?._id || null }),
        { status: 200 }
      );
    }

    // List mode: /api/favorites?userId=...
    // A favorite copies name/image/author/rating at save time, so those go
    // stale as soon as a recipe's photo changes, and dangle entirely when the
    // recipe is gone (re-seeding assigns new ids). A stale image URL on an
    // unconfigured host makes next/image throw and takes down the whole
    // favorites page, so read these fields off the live recipe and drop
    // favorites whose recipe no longer exists.
    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 }).lean();
    const recipes = await Recipe.find({
      _id: { $in: favorites.map((f) => f.recipeId) },
    }).lean();
    const recipeById = new Map(recipes.map((r) => [String(r._id), r]));

    const data = favorites.flatMap((fav) => {
      const recipe = recipeById.get(String(fav.recipeId));
      if (!recipe) return [];
      return [{
        ...fav,
        name: recipe.name,
        image: recipe.image,
        author: recipe.author,
        rating: recipe.rating,
      }];
    });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error('🔥 Error fetching favorites:', error.message);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const favoriteId = searchParams.get('favoriteId');
    const userId = searchParams.get('userId');

    if (!favoriteId || !userId) {
      return new Response(
        JSON.stringify({ message: 'favoriteId and userId are required.' }),
        { status: 400 }
      );
    }

    await dbConnect();

    const deleted = await Favorite.findOneAndDelete({ _id: favoriteId, userId });
    if (!deleted) {
      return new Response(
        JSON.stringify({ message: 'Favorite not found.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Recipe removed from favorites.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('🔥 Error removing favorite:', error.message);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}
