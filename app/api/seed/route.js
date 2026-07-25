import { NextResponse } from 'next/server';
import { dbConnect } from '@/service/mongo';
import { Recipe } from '@/models/recipe-model';

// 50 recipes, 5 per category. Every photo was reviewed by eye against its
// recipe name — no keyword-based random image services, which is what put
// cat statues and street parades on recipe cards. Images are freely licensed
// and committed under public/images/recipes/ — hotlinking Wikimedia made
// next/image return 429 on parallel card loads, which showed as broken images.
const recipes = [

  // Appetizers
  { name: "Caprese Skewers", description: "Fresh mozzarella, tomatoes, and basil on skewers", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/caprese-skewers.jpg", image: "/images/recipes/caprese-skewers.jpg", category: "Appetizers", serves: 4, rating: 4.4, steps: ["Thread mozzarella, tomato, and basil on skewers", "Drizzle with balsamic glaze", "Season with salt and pepper"] },
  { name: "Shrimp Cocktail", description: "Chilled shrimp with zesty cocktail sauce", author: "Chef Sarah", activeTime: "10 min", totalTime: "20 min", thumbnail: "/images/recipes/shrimp-cocktail.jpg", image: "/images/recipes/shrimp-cocktail.jpg", category: "Appetizers", serves: 4, rating: 4.5, steps: ["Cook shrimp until pink", "Chill shrimp", "Make cocktail sauce", "Serve chilled"] },
  { name: "Stuffed Mushrooms", description: "Mushroom caps filled with herbed cream cheese", author: "Chef John", activeTime: "20 min", totalTime: "35 min", thumbnail: "/images/recipes/stuffed-mushrooms.jpg", image: "/images/recipes/stuffed-mushrooms.jpg", category: "Appetizers", serves: 6, rating: 4.7, steps: ["Clean mushrooms and remove stems", "Mix cream cheese with herbs", "Fill caps with cheese mixture", "Bake until golden"] },
  { name: "Spinach Artichoke Dip", description: "Creamy baked dip with spinach and artichokes", author: "Chef Sarah", activeTime: "10 min", totalTime: "25 min", thumbnail: "/images/recipes/spinach-artichoke-dip.jpg", image: "/images/recipes/spinach-artichoke-dip.jpg", category: "Appetizers", serves: 8, rating: 4.6, steps: ["Mix cream cheese, spinach, and artichokes", "Add parmesan and seasonings", "Bake until bubbly", "Serve with chips"] },
  { name: "Mozzarella Sticks", description: "Crispy breaded mozzarella with marinara", author: "Chef Tom", activeTime: "15 min", totalTime: "25 min", thumbnail: "/images/recipes/mozzarella-sticks.jpg", image: "/images/recipes/mozzarella-sticks.jpg", category: "Appetizers", serves: 4, rating: 4.6, steps: ["Cut mozzarella into sticks", "Bread with eggs and crumbs", "Fry until golden", "Serve with sauce"] },

  // Main Course
  { name: "Beef Steak", description: "Perfectly seared ribeye with herb butter", author: "Chef John", activeTime: "10 min", totalTime: "20 min", thumbnail: "/images/recipes/beef-steak.jpg", image: "/images/recipes/beef-steak.jpg", category: "Main Course", serves: 2, rating: 4.9, steps: ["Bring steak to room temperature", "Season generously", "Sear in hot pan", "Rest and slice"] },
  { name: "Pork Tenderloin", description: "Roasted pork with apple glaze", author: "Chef Sarah", activeTime: "15 min", totalTime: "45 min", thumbnail: "/images/recipes/pork-tenderloin.jpg", image: "/images/recipes/pork-tenderloin.jpg", category: "Main Course", serves: 4, rating: 4.5, steps: ["Season pork", "Sear all sides", "Make apple glaze", "Roast and glaze"] },
  { name: "Pan-Seared Duck", description: "Crispy skin duck breast with cherry sauce", author: "Chef Pierre", activeTime: "15 min", totalTime: "25 min", thumbnail: "/images/recipes/pan-seared-duck.jpg", image: "/images/recipes/pan-seared-duck.jpg", category: "Main Course", serves: 2, rating: 4.7, steps: ["Score duck skin", "Cook skin-side down", "Make cherry sauce", "Slice and serve"] },
  { name: "Grilled Salmon", description: "Fresh Atlantic salmon with lemon butter sauce", author: "Chef Sarah", activeTime: "15 min", totalTime: "25 min", thumbnail: "/images/recipes/grilled-salmon.jpg", image: "/images/recipes/grilled-salmon.jpg", category: "Main Course", serves: 2, rating: 4.8, steps: ["Season salmon fillets", "Grill skin-side down", "Prepare lemon butter", "Drizzle and serve"] },
  { name: "Chicken Parmesan", description: "Breaded chicken with marinara and melted cheese", author: "Chef Maria", activeTime: "20 min", totalTime: "40 min", thumbnail: "/images/recipes/chicken-parmesan.jpg", image: "/images/recipes/chicken-parmesan.jpg", category: "Main Course", serves: 4, rating: 4.7, steps: ["Pound chicken thin", "Bread and fry", "Top with sauce and cheese", "Bake until bubbly"] },

  // Desserts
  { name: "Crème Brûlée", description: "Custard with caramelized sugar top", author: "Chef Pierre", activeTime: "15 min", totalTime: "4 hrs", thumbnail: "/images/recipes/creme-brulee.jpg", image: "/images/recipes/creme-brulee.jpg", category: "Desserts", serves: 4, rating: 4.8, steps: ["Make custard", "Pour into ramekins", "Bake in water bath", "Torch sugar on top"] },
  { name: "Panna Cotta", description: "Italian cream dessert with berry compote", author: "Chef Maria", activeTime: "15 min", totalTime: "4 hrs", thumbnail: "/images/recipes/panna-cotta.jpg", image: "/images/recipes/panna-cotta.jpg", category: "Desserts", serves: 6, rating: 4.5, steps: ["Heat cream and sugar", "Add gelatin", "Pour into molds", "Serve with berries"] },
  { name: "Flan", description: "Custard dessert with caramel sauce", author: "Chef Maria", activeTime: "15 min", totalTime: "4 hrs", thumbnail: "/images/recipes/flan.jpg", image: "/images/recipes/flan.jpg", category: "Desserts", serves: 8, rating: 4.5, steps: ["Make caramel", "Prepare custard", "Bake in water bath", "Unmold and serve"] },
  { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", author: "Chef Maria", activeTime: "30 min", totalTime: "4 hrs", thumbnail: "/images/recipes/tiramisu.jpg", image: "/images/recipes/tiramisu.jpg", category: "Desserts", serves: 8, rating: 4.9, steps: ["Make coffee", "Layer ladyfingers", "Add mascarpone mixture", "Chill and dust cocoa"] },
  { name: "Baklava", description: "Layered phyllo with nuts and honey syrup", author: "Chef Omar", activeTime: "30 min", totalTime: "1.5 hrs", thumbnail: "/images/recipes/baklava.jpg", image: "/images/recipes/baklava.jpg", category: "Desserts", serves: 12, rating: 4.6, steps: ["Layer phyllo and nuts", "Cut into pieces", "Pour butter", "Bake and syrup"] },

  // Soups
  { name: "Miso Soup", description: "Traditional Japanese soup with tofu", author: "Chef Yuki", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/miso-soup.jpg", image: "/images/recipes/miso-soup.jpg", category: "Soups", serves: 4, rating: 4.4, steps: ["Heat dashi broth", "Add miso paste", "Add tofu and seaweed", "Serve immediately"] },
  { name: "Minestrone", description: "Hearty Italian vegetable soup with pasta", author: "Chef Maria", activeTime: "20 min", totalTime: "45 min", thumbnail: "/images/recipes/minestrone.jpg", image: "/images/recipes/minestrone.jpg", category: "Soups", serves: 6, rating: 4.5, steps: ["Sauté vegetables", "Add broth and tomatoes", "Add beans and pasta", "Simmer and serve"] },
  { name: "Gazpacho", description: "Cold Spanish tomato soup", author: "Chef Maria", activeTime: "15 min", totalTime: "2 hrs", thumbnail: "/images/recipes/gazpacho.jpg", image: "/images/recipes/gazpacho.jpg", category: "Soups", serves: 6, rating: 4.5, steps: ["Blend tomatoes and vegetables", "Add olive oil", "Chill thoroughly", "Serve cold"] },
  { name: "Butternut Squash Soup", description: "Velvety smooth fall soup with nutmeg", author: "Chef Sarah", activeTime: "15 min", totalTime: "40 min", thumbnail: "/images/recipes/butternut-squash-soup.jpg", image: "/images/recipes/butternut-squash-soup.jpg", category: "Soups", serves: 6, rating: 4.7, steps: ["Roast squash", "Sauté aromatics", "Blend until smooth", "Season and serve"] },
  { name: "Chicken Noodle", description: "Classic comfort soup with tender chicken", author: "Chef Maria", activeTime: "20 min", totalTime: "45 min", thumbnail: "/images/recipes/chicken-noodle.jpg", image: "/images/recipes/chicken-noodle.jpg", category: "Soups", serves: 6, rating: 4.7, steps: ["Cook chicken", "Make broth", "Add noodles", "Season and serve"] },

  // Salads
  { name: "Caprese Salad", description: "Tomato, mozzarella, and basil salad", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/caprese-salad.jpg", image: "/images/recipes/caprese-salad.jpg", category: "Salads", serves: 2, rating: 4.6, steps: ["Slice tomatoes and mozzarella", "Arrange on plate", "Add basil leaves", "Drizzle with balsamic"] },
  { name: "Caesar Salad", description: "Crisp romaine with parmesan and croutons", author: "Chef Tom", activeTime: "15 min", totalTime: "20 min", thumbnail: "/images/recipes/caesar-salad.jpg", image: "/images/recipes/caesar-salad.jpg", category: "Salads", serves: 4, rating: 4.6, steps: ["Make dressing", "Toss romaine", "Add croutons", "Top with parmesan"] },
  { name: "Greek Salad", description: "Fresh Mediterranean salad with feta", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/greek-salad.jpg", image: "/images/recipes/greek-salad.jpg", category: "Salads", serves: 4, rating: 4.5, steps: ["Chop vegetables", "Add olives and feta", "Drizzle with dressing", "Toss gently"] },
  { name: "Waldorf Salad", description: "Classic fruit and nut salad", author: "Chef Martha", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/waldorf-salad.jpg", image: "/images/recipes/waldorf-salad.jpg", category: "Salads", serves: 4, rating: 4.3, steps: ["Chop apples and celery", "Add walnuts and grapes", "Toss with mayo dressing", "Serve chilled"] },
  { name: "Cobb Salad", description: "Loaded American salad with bacon and egg", author: "Chef John", activeTime: "15 min", totalTime: "20 min", thumbnail: "/images/recipes/cobb-salad.jpg", image: "/images/recipes/cobb-salad.jpg", category: "Salads", serves: 4, rating: 4.7, steps: ["Cook bacon and eggs", "Chop all ingredients", "Arrange on lettuce", "Add dressing"] },

  // Pasta
  { name: "Penne Arrabbiata", description: "Spicy tomato sauce pasta", author: "Chef Maria", activeTime: "10 min", totalTime: "20 min", thumbnail: "/images/recipes/penne-arrabbiata.jpg", image: "/images/recipes/penne-arrabbiata.jpg", category: "Pasta", serves: 4, rating: 4.5, steps: ["Cook pasta", "Sauté garlic and chili", "Add tomatoes", "Toss with pasta"] },
  { name: "Bolognese", description: "Rich meat sauce over tagliatelle", author: "Chef Pierre", activeTime: "30 min", totalTime: "3 hrs", thumbnail: "/images/recipes/bolognese.jpg", image: "/images/recipes/bolognese.jpg", category: "Pasta", serves: 6, rating: 4.8, steps: ["Brown the meat", "Add vegetables and wine", "Simmer for hours", "Serve over fresh pasta"] },
  { name: "Cacio e Pepe", description: "Simple Roman pasta with cheese and pepper", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/cacio-e-pepe.jpg", image: "/images/recipes/cacio-e-pepe.jpg", category: "Pasta", serves: 2, rating: 4.5, steps: ["Toast peppercorns", "Cook pasta", "Mix with pecorino", "Emulsify with pasta water"] },
  { name: "Gnocchi", description: "Soft potato dumplings with sage butter", author: "Chef Maria", activeTime: "40 min", totalTime: "1 hr", thumbnail: "/images/recipes/gnocchi.jpg", image: "/images/recipes/gnocchi.jpg", category: "Pasta", serves: 4, rating: 4.6, steps: ["Make potato dough", "Roll and cut gnocchi", "Boil until they float", "Serve with sage butter"] },
  { name: "Spaghetti Carbonara", description: "Classic Roman pasta with eggs and pancetta", author: "Chef Maria", activeTime: "15 min", totalTime: "25 min", thumbnail: "/images/recipes/spaghetti-carbonara.jpg", image: "/images/recipes/spaghetti-carbonara.jpg", category: "Pasta", serves: 4, rating: 4.8, steps: ["Cook pasta", "Crisp pancetta", "Mix eggs and cheese", "Combine off heat"] },

  // Seafood
  { name: "Garlic Shrimp", description: "Sautéed shrimp in garlic butter", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/garlic-shrimp.jpg", image: "/images/recipes/garlic-shrimp.jpg", category: "Seafood", serves: 4, rating: 4.7, steps: ["Season shrimp", "Sauté in garlic butter", "Add lemon juice", "Serve immediately"] },
  { name: "Calamari", description: "Crispy fried calamari with marinara", author: "Chef Tom", activeTime: "15 min", totalTime: "20 min", thumbnail: "/images/recipes/calamari.jpg", image: "/images/recipes/calamari.jpg", category: "Seafood", serves: 4, rating: 4.5, steps: ["Slice squid rings", "Bread with flour", "Fry until golden", "Serve with sauce"] },
  { name: "Cioppino", description: "San Francisco seafood stew in tomato broth", author: "Chef Maria", activeTime: "20 min", totalTime: "40 min", thumbnail: "/images/recipes/cioppino.jpg", image: "/images/recipes/cioppino.jpg", category: "Seafood", serves: 6, rating: 4.7, steps: ["Sauté aromatics", "Add tomatoes and wine", "Add seafood", "Simmer until done"] },
  { name: "Shrimp Scampi", description: "Shrimp in garlic white wine sauce", author: "Chef Maria", activeTime: "10 min", totalTime: "20 min", thumbnail: "/images/recipes/shrimp-scampi.jpg", image: "/images/recipes/shrimp-scampi.jpg", category: "Seafood", serves: 4, rating: 4.6, steps: ["Cook shrimp", "Make garlic sauce", "Add pasta", "Toss together"] },
  { name: "Fish Tacos", description: "Grilled fish with slaw and lime crema", author: "Chef Carlos", activeTime: "15 min", totalTime: "25 min", thumbnail: "/images/recipes/fish-tacos.jpg", image: "/images/recipes/fish-tacos.jpg", category: "Seafood", serves: 4, rating: 4.6, steps: ["Season and grill fish", "Make slaw", "Prepare lime crema", "Assemble tacos"] },

  // Vegetarian
  { name: "Falafel", description: "Crispy chickpea fritters with tahini", author: "Chef Omar", activeTime: "20 min", totalTime: "30 min", thumbnail: "/images/recipes/falafel.jpg", image: "/images/recipes/falafel.jpg", category: "Vegetarian", serves: 6, rating: 4.6, steps: ["Blend chickpeas", "Form into balls", "Deep fry until golden", "Serve with tahini"] },
  { name: "Eggplant Parmesan", description: "Breaded eggplant with marinara and cheese", author: "Chef Maria", activeTime: "20 min", totalTime: "45 min", thumbnail: "/images/recipes/eggplant-parmesan.jpg", image: "/images/recipes/eggplant-parmesan.jpg", category: "Vegetarian", serves: 4, rating: 4.7, steps: ["Slice and salt eggplant", "Bread and fry", "Layer with sauce and cheese", "Bake until bubbly"] },
  { name: "Stuffed Bell Peppers", description: "Bell peppers with rice and cheese filling", author: "Chef Maria", activeTime: "20 min", totalTime: "45 min", thumbnail: "/images/recipes/stuffed-bell-peppers.jpg", image: "/images/recipes/stuffed-bell-peppers.jpg", category: "Vegetarian", serves: 4, rating: 4.6, steps: ["Blanch peppers", "Make rice filling", "Stuff peppers", "Bake until tender"] },
  { name: "Mushroom Risotto", description: "Creamy Italian rice with wild mushrooms", author: "Chef Pierre", activeTime: "10 min", totalTime: "40 min", thumbnail: "/images/recipes/mushroom-risotto.jpg", image: "/images/recipes/mushroom-risotto.jpg", category: "Vegetarian", serves: 4, rating: 4.8, steps: ["Sauté mushrooms", "Toast rice", "Add warm broth slowly", "Finish with parmesan"] },
  { name: "Spinach Lasagna", description: "Layers of spinach and cheese", author: "Chef Maria", activeTime: "30 min", totalTime: "1.5 hrs", thumbnail: "/images/recipes/spinach-lasagna.jpg", image: "/images/recipes/spinach-lasagna.jpg", category: "Vegetarian", serves: 8, rating: 4.6, steps: ["Make spinach filling", "Layer with pasta", "Add cheese sauce", "Bake until golden"] },

  // Breakfast
  { name: "Pancakes", description: "Fluffy buttermilk pancakes with maple syrup", author: "Chef Martha", activeTime: "10 min", totalTime: "20 min", thumbnail: "/images/recipes/pancakes.jpg", image: "/images/recipes/pancakes.jpg", category: "Breakfast", serves: 4, rating: 4.6, steps: ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle", "Serve with syrup"] },
  { name: "French Toast", description: "Cinnamon vanilla French toast", author: "Chef Sarah", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/french-toast.jpg", image: "/images/recipes/french-toast.jpg", category: "Breakfast", serves: 4, rating: 4.5, steps: ["Make egg mixture", "Dip bread", "Cook until golden", "Top with berries"] },
  { name: "Avocado Toast", description: "Smashed avocado on sourdough", author: "Chef Sarah", activeTime: "5 min", totalTime: "10 min", thumbnail: "/images/recipes/avocado-toast.jpg", image: "/images/recipes/avocado-toast.jpg", category: "Breakfast", serves: 1, rating: 4.4, steps: ["Toast bread", "Mash avocado", "Spread on toast", "Season and serve"] },
  { name: "Granola Bowl", description: "Crunchy granola with yogurt and fruit", author: "Chef Martha", activeTime: "5 min", totalTime: "10 min", thumbnail: "/images/recipes/granola-bowl.jpg", image: "/images/recipes/granola-bowl.jpg", category: "Breakfast", serves: 1, rating: 4.3, steps: ["Layer yogurt", "Add granola", "Top with fruit", "Drizzle honey"] },
  { name: "Breakfast Burrito", description: "Loaded breakfast burrito with salsa", author: "Chef Carlos", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/breakfast-burrito.jpg", image: "/images/recipes/breakfast-burrito.jpg", category: "Breakfast", serves: 2, rating: 4.6, steps: ["Scramble eggs", "Cook beans", "Warm tortilla", "Fill and roll"] },

  // Grilled
  { name: "Grilled Corn", description: "Smoky grilled corn with lime butter", author: "Chef Carlos", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/grilled-corn.jpg", image: "/images/recipes/grilled-corn.jpg", category: "Grilled", serves: 4, rating: 4.5, steps: ["Shuck corn", "Grill until charred", "Make lime butter", "Brush and serve"] },
  { name: "Burgers", description: "Classic American beef burgers", author: "Chef Tom", activeTime: "10 min", totalTime: "15 min", thumbnail: "/images/recipes/burgers.jpg", image: "/images/recipes/burgers.jpg", category: "Grilled", serves: 4, rating: 4.7, steps: ["Form patties", "Season generously", "Grill to desired doneness", "Assemble with toppings"] },
  { name: "Grilled Vegetables", description: "Seasonal vegetables on the grill", author: "Chef Sarah", activeTime: "15 min", totalTime: "20 min", thumbnail: "/images/recipes/grilled-vegetables.jpg", image: "/images/recipes/grilled-vegetables.jpg", category: "Grilled", serves: 4, rating: 4.5, steps: ["Slice vegetables", "Oil and season", "Grill until charred", "Serve warm"] },
  { name: "Satay Skewers", description: "Thai peanut sauce chicken skewers", author: "Chef Yuki", activeTime: "20 min", totalTime: "30 min", thumbnail: "/images/recipes/satay-skewers.jpg", image: "/images/recipes/satay-skewers.jpg", category: "Grilled", serves: 4, rating: 4.7, steps: ["Marinate chicken", "Make peanut sauce", "Grill skewers", "Serve with sauce"] },
  { name: "Grilled Chicken", description: "Herb-marinated grilled chicken breast", author: "Chef John", activeTime: "15 min", totalTime: "30 min", thumbnail: "/images/recipes/grilled-chicken.jpg", image: "/images/recipes/grilled-chicken.jpg", category: "Grilled", serves: 4, rating: 4.7, steps: ["Marinate chicken", "Preheat grill", "Grill until done", "Rest and serve"] },
];

export async function GET() {
  try {
    await dbConnect();

    // Clear existing recipes
    await Recipe.deleteMany({});

    // Insert new recipes
    const result = await Recipe.insertMany(recipes);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.length} recipes`,
      count: result.length,
      categories: [...new Set(recipes.map((r) => r.category))],
    }, { status: 200 });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to seed database',
      error: error.message,
    }, { status: 500 });
  }
}
