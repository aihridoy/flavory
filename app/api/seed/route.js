import { NextResponse } from 'next/server';
import { dbConnect } from '@/service/mongo';
import { Recipe } from '@/models/recipe-model';

const categories = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Soups",
  "Salads",
  "Pasta",
  "Seafood",
  "Vegetarian",
  "Breakfast",
  "Grilled",
];

const RECIPES_PER_CATEGORY = 10;

// Maps each recipe name to a food-relevant keyword for the loremflickr URL.
const foodKeywords = {
  "Bruschetta": "bread",
  "Stuffed Mushrooms": "mushroom",
  "Spinach Artichoke Dip": "dip",
  "Caprese Skewers": "caprese",
  "Chicken Wings": "wings",
  "Shrimp Cocktail": "seafood",
  "Hummus": "hummus",
  "Spinach Puffs": "pastry",
  "Mozzarella Sticks": "cheese",

  "Grilled Salmon": "salmon",
  "Beef Steak": "steak",
  "Chicken Parmesan": "chicken",
  "Lamb Chops": "lamb",
  "Pork Tenderloin": "pork",
  "Chicken Tikka Masala": "curry",
  "Beef Bourguignon": "stew",
  "Teriyaki Chicken": "chicken",
  "Pan-Seared Duck": "duck",

  "Tiramisu": "dessert",
  "Chocolate Lava Cake": "cake",
  "Cheesecake": "cheesecake",
  "Crème Brûlée": "custard",
  "Apple Pie": "pie",
  "Panna Cotta": "dessert",
  "Chocolate Mousse": "chocolate",
  "Baklava": "pastry",
  "Flan": "custard",

  "Tomato Soup": "soup",
  "Chicken Noodle": "soup",
  "French Onion": "soup",
  "Minestrone": "soup",
  "Clam Chowder": "chowder",
  "Miso Soup": "soup",
  "Gazpacho": "soup",
  "Butternut Squash Soup": "soup",

  "Caesar Salad": "salad",
  "Greek Salad": "salad",
  "Cobb Salad": "salad",
  "Quinoa Salad": "salad",
  "Caprese Salad": "caprese",
  "Waldorf Salad": "salad",
  "Asian Sesame Salad": "salad",
  "Kale Salad": "salad",

  "Spaghetti Carbonara": "pasta",
  "Penne Arrabbiata": "pasta",
  "Fettuccine Alfredo": "pasta",
  "Lasagna": "pasta",
  "Pesto Linguine": "pasta",
  "Bolognese": "pasta",
  "Cacio e Pepe": "pasta",
  "Gnocchi": "pasta",

  "Lobster Tail": "lobster",
  "Garlic Shrimp": "shrimp",
  "Fish Tacos": "fish",
  "Seared Scallops": "scallops",
  "Calamari": "seafood",
  "Cioppino": "seafood",
  "Shrimp Scampi": "shrimp",
  "Grilled Octopus": "octopus",

  "Vegetable Stir Fry": "vegetables",
  "Stuffed Bell Peppers": "peppers",
  "Eggplant Parmesan": "eggplant",
  "Mushroom Risotto": "risotto",
  "Vegetable Curry": "curry",
  "Spinach Lasagna": "pasta",
  "Portobello Steaks": "mushroom",
  "Falafel": "falafel",

  "Eggs Benedict": "eggs",
  "Pancakes": "pancakes",
  "French Toast": "breakfast",
  "Avocado Toast": "toast",
  "Granola Bowl": "granola",
  "Omelette": "eggs",
  "Breakfast Burrito": "burrito",
  "Acai Bowl": "smoothie",

  "BBQ Ribs": "ribs",
  "Grilled Chicken": "chicken",
  "Kebabs": "kebab",
  "Grilled Corn": "corn",
  "Burgers": "burger",
  "Grilled Vegetables": "vegetables",
  "Shish Taouk": "chicken",
  "Pork Chops": "pork",
  "Grilled Pizza": "pizza",
  "Satay Skewers": "satay",
  "Lamb Kebabs": "lamb",
  "Grilled Swordfish": "fish",
  "Chicken Tikka": "chicken",
};

const foodImage = (keyword, w, h) =>
  `https://loremflickr.com/${w}/${h}/food,${encodeURIComponent(keyword)}`;

const recipes = [
  // Appetizers (9 recipes)
  { name: "Bruschetta", description: "Toasted bread topped with fresh tomatoes, basil, and garlic", author: "Chef Maria", activeTime: "15 min", totalTime: "20 min", thumbnail: "", image: "", category: "Appetizers", serves: 4, rating: 4.5, steps: ["Toast bread slices", "Dice tomatoes and mix with basil and garlic", "Top bread with tomato mixture", "Drizzle with olive oil"] },
  { name: "Stuffed Mushrooms", description: "Mushroom caps filled with herbed cream cheese", author: "Chef John", activeTime: "20 min", totalTime: "35 min", thumbnail: "", image: "", category: "Appetizers", serves: 6, rating: 4.7, steps: ["Clean mushrooms and remove stems", "Mix cream cheese with herbs", "Fill caps with cheese mixture", "Bake until golden"] },
  { name: "Spinach Artichoke Dip", description: "Creamy baked dip with spinach and artichokes", author: "Chef Sarah", activeTime: "10 min", totalTime: "25 min", thumbnail: "", image: "", category: "Appetizers", serves: 8, rating: 4.6, steps: ["Mix cream cheese, spinach, and artichokes", "Add parmesan and seasonings", "Bake until bubbly", "Serve with chips"] },
  { name: "Caprese Skewers", description: "Fresh mozzarella, tomatoes, and basil on skewers", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Appetizers", serves: 4, rating: 4.4, steps: ["Thread mozzarella, tomato, and basil on skewers", "Drizzle with balsamic glaze", "Season with salt and pepper"] },
  { name: "Chicken Wings", description: "Crispy fried wings with buffalo sauce", author: "Chef Tom", activeTime: "15 min", totalTime: "45 min", thumbnail: "", image: "", category: "Appetizers", serves: 6, rating: 4.8, steps: ["Season wings with spices", "Deep fry until crispy", "Toss in buffalo sauce", "Serve with ranch"] },
  { name: "Shrimp Cocktail", description: "Chilled shrimp with zesty cocktail sauce", author: "Chef Sarah", activeTime: "10 min", totalTime: "20 min", thumbnail: "", image: "", category: "Appetizers", serves: 4, rating: 4.5, steps: ["Cook shrimp until pink", "Chill shrimp", "Make cocktail sauce", "Serve chilled"] },
  { name: "Hummus", description: "Smooth chickpea dip with tahini and lemon", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Appetizers", serves: 6, rating: 4.3, steps: ["Blend chickpeas, tahini, lemon", "Add olive oil and garlic", "Season to taste", "Serve with pita"] },
  { name: "Spinach Puffs", description: "Flaky puff pastry parcels filled with spinach and feta", author: "Chef Maria", activeTime: "20 min", totalTime: "35 min", thumbnail: "", image: "", category: "Appetizers", serves: 6, rating: 4.5, steps: ["Sauté spinach with garlic", "Mix with feta and seasonings", "Wrap in puff pastry", "Bake until golden"] },
  { name: "Mozzarella Sticks", description: "Crispy breaded mozzarella with marinara", author: "Chef Tom", activeTime: "15 min", totalTime: "25 min", thumbnail: "", image: "", category: "Appetizers", serves: 4, rating: 4.6, steps: ["Cut mozzarella into sticks", "Bread with eggs and crumbs", "Fry until golden", "Serve with sauce"] },

  // Main Course (9 recipes)
  { name: "Grilled Salmon", description: "Fresh Atlantic salmon with lemon butter sauce", author: "Chef Sarah", activeTime: "15 min", totalTime: "25 min", thumbnail: "", image: "", category: "Main Course", serves: 2, rating: 4.8, steps: ["Season salmon fillets", "Grill skin-side down", "Prepare lemon butter", "Drizzle and serve"] },
  { name: "Beef Steak", description: "Perfectly seared ribeye with herb butter", author: "Chef John", activeTime: "10 min", totalTime: "20 min", thumbnail: "", image: "", category: "Main Course", serves: 2, rating: 4.9, steps: ["Bring steak to room temperature", "Season generously", "Sear in hot pan", "Rest and slice"] },
  { name: "Chicken Parmesan", description: "Breaded chicken with marinara and melted cheese", author: "Chef Maria", activeTime: "20 min", totalTime: "40 min", thumbnail: "", image: "", category: "Main Course", serves: 4, rating: 4.7, steps: ["Pound chicken thin", "Bread and fry", "Top with sauce and cheese", "Bake until bubbly"] },
  { name: "Lamb Chops", description: "Herb-crusted lamb with mint sauce", author: "Chef Tom", activeTime: "15 min", totalTime: "30 min", thumbnail: "", image: "", category: "Main Course", serves: 2, rating: 4.6, steps: ["Marinate lamb chops", "Grill to desired doneness", "Make mint sauce", "Rest and serve"] },
  { name: "Pork Tenderloin", description: "Roasted pork with apple glaze", author: "Chef Sarah", activeTime: "15 min", totalTime: "45 min", thumbnail: "", image: "", category: "Main Course", serves: 4, rating: 4.5, steps: ["Season pork", "Sear all sides", "Make apple glaze", "Roast and glaze"] },
  { name: "Chicken Tikka Masala", description: "Creamy tomato-based Indian chicken curry", author: "Chef Priya", activeTime: "20 min", totalTime: "40 min", thumbnail: "", image: "", category: "Main Course", serves: 4, rating: 4.8, steps: ["Marinate chicken", "Cook in tandoor or grill", "Make sauce", "Combine and simmer"] },
  { name: "Beef Bourguignon", description: "Classic French beef stew in red wine", author: "Chef Pierre", activeTime: "30 min", totalTime: "3 hrs", thumbnail: "", image: "", category: "Main Course", serves: 6, rating: 4.9, steps: ["Sear beef cubes", "Sauté vegetables", "Add wine and broth", "Slow cook until tender"] },
  { name: "Teriyaki Chicken", description: "Sweet and savory glazed chicken", author: "Chef Yuki", activeTime: "15 min", totalTime: "30 min", thumbnail: "", image: "", category: "Main Course", serves: 4, rating: 4.6, steps: ["Make teriyaki sauce", "Cook chicken", "Glaze with sauce", "Serve with rice"] },
  { name: "Pan-Seared Duck", description: "Crispy skin duck breast with cherry sauce", author: "Chef Pierre", activeTime: "15 min", totalTime: "25 min", thumbnail: "", image: "", category: "Main Course", serves: 2, rating: 4.7, steps: ["Score duck skin", "Cook skin-side down", "Make cherry sauce", "Slice and serve"] },

  // Desserts (9 recipes)
  { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", author: "Chef Maria", activeTime: "30 min", totalTime: "4 hrs", thumbnail: "", image: "", category: "Desserts", serves: 8, rating: 4.9, steps: ["Make coffee", "Layer ladyfingers", "Add mascarpone mixture", "Chill and dust cocoa"] },
  { name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center", author: "Chef John", activeTime: "15 min", totalTime: "25 min", thumbnail: "", image: "", category: "Desserts", serves: 4, rating: 4.8, steps: ["Melt chocolate and butter", "Mix with eggs and sugar", "Add flour", "Bake and serve warm"] },
  { name: "Cheesecake", description: "Creamy New York style cheesecake", author: "Chef Sarah", activeTime: "20 min", totalTime: "5 hrs", thumbnail: "", image: "", category: "Desserts", serves: 10, rating: 4.7, steps: ["Make crust", "Prepare filling", "Bake in water bath", "Chill overnight"] },
  { name: "Crème Brûlée", description: "Custard with caramelized sugar top", author: "Chef Pierre", activeTime: "15 min", totalTime: "4 hrs", thumbnail: "", image: "", category: "Desserts", serves: 4, rating: 4.8, steps: ["Make custard", "Pour into ramekins", "Bake in water bath", "Torch sugar on top"] },
  { name: "Apple Pie", description: "Classic American apple pie with flaky crust", author: "Chef Martha", activeTime: "30 min", totalTime: "1.5 hrs", thumbnail: "", image: "", category: "Desserts", serves: 8, rating: 4.6, steps: ["Make pie crust", "Prepare apple filling", "Assemble pie", "Bake until golden"] },
  { name: "Panna Cotta", description: "Italian cream dessert with berry compote", author: "Chef Maria", activeTime: "15 min", totalTime: "4 hrs", thumbnail: "", image: "", category: "Desserts", serves: 6, rating: 4.5, steps: ["Heat cream and sugar", "Add gelatin", "Pour into molds", "Serve with berries"] },
  { name: "Chocolate Mousse", description: "Light and airy chocolate mousse", author: "Chef Pierre", activeTime: "20 min", totalTime: "3 hrs", thumbnail: "", image: "", category: "Desserts", serves: 6, rating: 4.7, steps: ["Melt chocolate", "Whip cream and eggs", "Fold together", "Chill until set"] },
  { name: "Baklava", description: "Layered phyllo with nuts and honey syrup", author: "Chef Omar", activeTime: "30 min", totalTime: "1.5 hrs", thumbnail: "", image: "", category: "Desserts", serves: 12, rating: 4.6, steps: ["Layer phyllo and nuts", "Cut into pieces", "Pour butter", "Bake and syrup"] },
  { name: "Flan", description: "Custard dessert with caramel sauce", author: "Chef Maria", activeTime: "15 min", totalTime: "4 hrs", thumbnail: "", image: "", category: "Desserts", serves: 8, rating: 4.5, steps: ["Make caramel", "Prepare custard", "Bake in water bath", "Unmold and serve"] },

  // Soups (8 recipes)
  { name: "Tomato Soup", description: "Creamy roasted tomato soup with basil", author: "Chef Sarah", activeTime: "15 min", totalTime: "40 min", thumbnail: "", image: "", category: "Soups", serves: 6, rating: 4.6, steps: ["Roast tomatoes", "Sauté onions", "Blend everything", "Season and serve"] },
  { name: "Chicken Noodle", description: "Classic comfort soup with tender chicken", author: "Chef Maria", activeTime: "20 min", totalTime: "45 min", thumbnail: "", image: "", category: "Soups", serves: 6, rating: 4.7, steps: ["Cook chicken", "Make broth", "Add noodles", "Season and serve"] },
  { name: "French Onion", description: "Rich caramelized onion soup with gruyere", author: "Chef Pierre", activeTime: "20 min", totalTime: "1.5 hrs", thumbnail: "", image: "", category: "Soups", serves: 4, rating: 4.8, steps: ["Caramelize onions", "Add broth and wine", "Ladle into bowls", "Top with cheese and broil"] },
  { name: "Minestrone", description: "Hearty Italian vegetable soup with pasta", author: "Chef Maria", activeTime: "20 min", totalTime: "45 min", thumbnail: "", image: "", category: "Soups", serves: 6, rating: 4.5, steps: ["Sauté vegetables", "Add broth and tomatoes", "Add beans and pasta", "Simmer and serve"] },
  { name: "Clam Chowder", description: "Creamy New England clam chowder", author: "Chef Tom", activeTime: "20 min", totalTime: "40 min", thumbnail: "", image: "", category: "Soups", serves: 6, rating: 4.6, steps: ["Cook bacon", "Sauté vegetables", "Add clams and cream", "Simmer and serve"] },
  { name: "Miso Soup", description: "Traditional Japanese soup with tofu", author: "Chef Yuki", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Soups", serves: 4, rating: 4.4, steps: ["Heat dashi broth", "Add miso paste", "Add tofu and seaweed", "Serve immediately"] },
  { name: "Gazpacho", description: "Cold Spanish tomato soup", author: "Chef Maria", activeTime: "15 min", totalTime: "2 hrs", thumbnail: "", image: "", category: "Soups", serves: 6, rating: 4.5, steps: ["Blend tomatoes and vegetables", "Add olive oil", "Chill thoroughly", "Serve cold"] },
  { name: "Butternut Squash Soup", description: "Velvety smooth fall soup with nutmeg", author: "Chef Sarah", activeTime: "15 min", totalTime: "40 min", thumbnail: "", image: "", category: "Soups", serves: 6, rating: 4.7, steps: ["Roast squash", "Sauté aromatics", "Blend until smooth", "Season and serve"] },

  // Salads (8 recipes)
  { name: "Caesar Salad", description: "Crisp romaine with parmesan and croutons", author: "Chef Tom", activeTime: "15 min", totalTime: "20 min", thumbnail: "", image: "", category: "Salads", serves: 4, rating: 4.6, steps: ["Make dressing", "Toss romaine", "Add croutons", "Top with parmesan"] },
  { name: "Greek Salad", description: "Fresh Mediterranean salad with feta", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Salads", serves: 4, rating: 4.5, steps: ["Chop vegetables", "Add olives and feta", "Drizzle with dressing", "Toss gently"] },
  { name: "Cobb Salad", description: "Loaded American salad with bacon and egg", author: "Chef John", activeTime: "15 min", totalTime: "20 min", thumbnail: "", image: "", category: "Salads", serves: 4, rating: 4.7, steps: ["Cook bacon and eggs", "Chop all ingredients", "Arrange on lettuce", "Add dressing"] },
  { name: "Quinoa Salad", description: "Protein-rich salad with vegetables", author: "Chef Sarah", activeTime: "15 min", totalTime: "25 min", thumbnail: "", image: "", category: "Salads", serves: 4, rating: 4.4, steps: ["Cook quinoa", "Chop vegetables", "Mix with dressing", "Chill and serve"] },
  { name: "Caprese Salad", description: "Tomato, mozzarella, and basil salad", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Salads", serves: 2, rating: 4.6, steps: ["Slice tomatoes and mozzarella", "Arrange on plate", "Add basil leaves", "Drizzle with balsamic"] },
  { name: "Waldorf Salad", description: "Classic fruit and nut salad", author: "Chef Martha", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Salads", serves: 4, rating: 4.3, steps: ["Chop apples and celery", "Add walnuts and grapes", "Toss with mayo dressing", "Serve chilled"] },
  { name: "Asian Sesame Salad", description: "Crispy vegetables with sesame dressing", author: "Chef Yuki", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Salads", serves: 4, rating: 4.5, steps: ["Shred vegetables", "Make sesame dressing", "Toss together", "Top with sesame seeds"] },
  { name: "Kale Salad", description: "Massaged kale with cranberries and nuts", author: "Chef Sarah", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Salads", serves: 4, rating: 4.4, steps: ["Massage kale with oil", "Add dried cranberries", "Add nuts and cheese", "Toss with dressing"] },

  // Pasta (8 recipes)
  { name: "Spaghetti Carbonara", description: "Classic Roman pasta with eggs and pancetta", author: "Chef Maria", activeTime: "15 min", totalTime: "25 min", thumbnail: "", image: "", category: "Pasta", serves: 4, rating: 4.8, steps: ["Cook pasta", "Crisp pancetta", "Mix eggs and cheese", "Combine off heat"] },
  { name: "Penne Arrabbiata", description: "Spicy tomato sauce pasta", author: "Chef Maria", activeTime: "10 min", totalTime: "20 min", thumbnail: "", image: "", category: "Pasta", serves: 4, rating: 4.5, steps: ["Cook pasta", "Sauté garlic and chili", "Add tomatoes", "Toss with pasta"] },
  { name: "Fettuccine Alfredo", description: "Creamy Parmesan butter sauce pasta", author: "Chef Tom", activeTime: "10 min", totalTime: "20 min", thumbnail: "", image: "", category: "Pasta", serves: 4, rating: 4.7, steps: ["Cook pasta", "Melt butter", "Add cream and parmesan", "Toss with pasta"] },
  { name: "Lasagna", description: "Layered pasta with meat sauce and ricotta", author: "Chef Maria", activeTime: "30 min", totalTime: "1.5 hrs", thumbnail: "", image: "", category: "Pasta", serves: 8, rating: 4.9, steps: ["Make meat sauce", "Mix ricotta filling", "Layer everything", "Bake until bubbly"] },
  { name: "Pesto Linguine", description: "Fresh basil pesto with pine nuts", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Pasta", serves: 4, rating: 4.6, steps: ["Cook pasta", "Blend pesto ingredients", "Toss pasta with pesto", "Top with parmesan"] },
  { name: "Bolognese", description: "Rich meat sauce over tagliatelle", author: "Chef Pierre", activeTime: "30 min", totalTime: "3 hrs", thumbnail: "", image: "", category: "Pasta", serves: 6, rating: 4.8, steps: ["Brown the meat", "Add vegetables and wine", "Simmer for hours", "Serve over fresh pasta"] },
  { name: "Cacio e Pepe", description: "Simple Roman pasta with cheese and pepper", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Pasta", serves: 2, rating: 4.5, steps: ["Toast peppercorns", "Cook pasta", "Mix with pecorino", "Emulsify with pasta water"] },
  { name: "Gnocchi", description: "Soft potato dumplings with sage butter", author: "Chef Maria", activeTime: "40 min", totalTime: "1 hr", thumbnail: "", image: "", category: "Pasta", serves: 4, rating: 4.6, steps: ["Make potato dough", "Roll and cut gnocchi", "Boil until they float", "Serve with sage butter"] },

  // Seafood (8 recipes)
  { name: "Lobster Tail", description: "Butter-poached lobster with draw butter", author: "Chef Tom", activeTime: "15 min", totalTime: "25 min", thumbnail: "", image: "", category: "Seafood", serves: 2, rating: 4.9, steps: ["Split lobster tails", "Poach in butter", "Make draw butter", "Serve with lemon"] },
  { name: "Garlic Shrimp", description: "Sautéed shrimp in garlic butter", author: "Chef Maria", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Seafood", serves: 4, rating: 4.7, steps: ["Season shrimp", "Sauté in garlic butter", "Add lemon juice", "Serve immediately"] },
  { name: "Fish Tacos", description: "Grilled fish with slaw and lime crema", author: "Chef Carlos", activeTime: "15 min", totalTime: "25 min", thumbnail: "", image: "", category: "Seafood", serves: 4, rating: 4.6, steps: ["Season and grill fish", "Make slaw", "Prepare lime crema", "Assemble tacos"] },
  { name: "Seared Scallops", description: "Perfectly seared scallops with beurre blanc", author: "Chef Pierre", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Seafood", serves: 2, rating: 4.8, steps: ["Pat scallops dry", "Sear in hot pan", "Make beurre blanc", "Plate and serve"] },
  { name: "Calamari", description: "Crispy fried calamari with marinara", author: "Chef Tom", activeTime: "15 min", totalTime: "20 min", thumbnail: "", image: "", category: "Seafood", serves: 4, rating: 4.5, steps: ["Slice squid rings", "Bread with flour", "Fry until golden", "Serve with sauce"] },
  { name: "Cioppino", description: "San Francisco seafood stew in tomato broth", author: "Chef Maria", activeTime: "20 min", totalTime: "40 min", thumbnail: "", image: "", category: "Seafood", serves: 6, rating: 4.7, steps: ["Sauté aromatics", "Add tomatoes and wine", "Add seafood", "Simmer until done"] },
  { name: "Shrimp Scampi", description: "Shrimp in garlic white wine sauce", author: "Chef Maria", activeTime: "10 min", totalTime: "20 min", thumbnail: "", image: "", category: "Seafood", serves: 4, rating: 4.6, steps: ["Cook shrimp", "Make garlic sauce", "Add pasta", "Toss together"] },
  { name: "Grilled Octopus", description: "Tender grilled octopus with chimichurri", author: "Chef Carlos", activeTime: "15 min", totalTime: "1 hr", thumbnail: "", image: "", category: "Seafood", serves: 4, rating: 4.5, steps: ["Braise octopus", "Grill until charred", "Make chimichurri", "Serve with sauce"] },

  // Vegetarian (8 recipes)
  { name: "Vegetable Stir Fry", description: "Colorful vegetables in teriyaki sauce", author: "Chef Yuki", activeTime: "15 min", totalTime: "20 min", thumbnail: "", image: "", category: "Vegetarian", serves: 4, rating: 4.5, steps: ["Prep vegetables", "Make teriyaki sauce", "Stir fry vegetables", "Serve over rice"] },
  { name: "Stuffed Bell Peppers", description: "Bell peppers with rice and cheese filling", author: "Chef Maria", activeTime: "20 min", totalTime: "45 min", thumbnail: "", image: "", category: "Vegetarian", serves: 4, rating: 4.6, steps: ["Blanch peppers", "Make rice filling", "Stuff peppers", "Bake until tender"] },
  { name: "Eggplant Parmesan", description: "Breaded eggplant with marinara and cheese", author: "Chef Maria", activeTime: "20 min", totalTime: "45 min", thumbnail: "", image: "", category: "Vegetarian", serves: 4, rating: 4.7, steps: ["Slice and salt eggplant", "Bread and fry", "Layer with sauce and cheese", "Bake until bubbly"] },
  { name: "Mushroom Risotto", description: "Creamy Italian rice with wild mushrooms", author: "Chef Pierre", activeTime: "10 min", totalTime: "40 min", thumbnail: "", image: "", category: "Vegetarian", serves: 4, rating: 4.8, steps: ["Sauté mushrooms", "Toast rice", "Add warm broth slowly", "Finish with parmesan"] },
  { name: "Vegetable Curry", description: "Rich coconut curry with mixed vegetables", author: "Chef Priya", activeTime: "15 min", totalTime: "30 min", thumbnail: "", image: "", category: "Vegetarian", serves: 4, rating: 4.5, steps: ["Toast spices", "Sauté aromatics", "Add coconut milk and vegetables", "Simmer until done"] },
  { name: "Spinach Lasagna", description: "Layers of spinach and cheese", author: "Chef Maria", activeTime: "30 min", totalTime: "1.5 hrs", thumbnail: "", image: "", category: "Vegetarian", serves: 8, rating: 4.6, steps: ["Make spinach filling", "Layer with pasta", "Add cheese sauce", "Bake until golden"] },
  { name: "Portobello Steaks", description: "Grilled portobello with balsamic glaze", author: "Chef Sarah", activeTime: "10 min", totalTime: "20 min", thumbnail: "", image: "", category: "Vegetarian", serves: 2, rating: 4.4, steps: ["Marinate mushrooms", "Grill until tender", "Make balsamic glaze", "Serve with sides"] },
  { name: "Falafel", description: "Crispy chickpea fritters with tahini", author: "Chef Omar", activeTime: "20 min", totalTime: "30 min", thumbnail: "", image: "", category: "Vegetarian", serves: 6, rating: 4.6, steps: ["Blend chickpeas", "Form into balls", "Deep fry until golden", "Serve with tahini"] },

  // Breakfast (8 recipes)
  { name: "Eggs Benedict", description: "Poached eggs on English muffins with hollandaise", author: "Chef Tom", activeTime: "20 min", totalTime: "25 min", thumbnail: "", image: "", category: "Breakfast", serves: 2, rating: 4.8, steps: ["Make hollandaise", "Poach eggs", "Toast muffins", "Assemble and serve"] },
  { name: "Pancakes", description: "Fluffy buttermilk pancakes with maple syrup", author: "Chef Martha", activeTime: "10 min", totalTime: "20 min", thumbnail: "", image: "", category: "Breakfast", serves: 4, rating: 4.6, steps: ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle", "Serve with syrup"] },
  { name: "French Toast", description: "Cinnamon vanilla French toast", author: "Chef Sarah", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Breakfast", serves: 4, rating: 4.5, steps: ["Make egg mixture", "Dip bread", "Cook until golden", "Top with berries"] },
  { name: "Avocado Toast", description: "Smashed avocado on sourdough", author: "Chef Sarah", activeTime: "5 min", totalTime: "10 min", thumbnail: "", image: "", category: "Breakfast", serves: 1, rating: 4.4, steps: ["Toast bread", "Mash avocado", "Spread on toast", "Season and serve"] },
  { name: "Granola Bowl", description: "Crunchy granola with yogurt and fruit", author: "Chef Martha", activeTime: "5 min", totalTime: "10 min", thumbnail: "", image: "", category: "Breakfast", serves: 1, rating: 4.3, steps: ["Layer yogurt", "Add granola", "Top with fruit", "Drizzle honey"] },
  { name: "Omelette", description: "Fluffy three-egg omelette with cheese", author: "Chef Tom", activeTime: "5 min", totalTime: "10 min", thumbnail: "", image: "", category: "Breakfast", serves: 1, rating: 4.5, steps: ["Beat eggs", "Heat pan", "Add fillings", "Fold and serve"] },
  { name: "Breakfast Burrito", description: "Loaded breakfast burrito with salsa", author: "Chef Carlos", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Breakfast", serves: 2, rating: 4.6, steps: ["Scramble eggs", "Cook beans", "Warm tortilla", "Fill and roll"] },
  { name: "Acai Bowl", description: "Frozen acai blend with toppings", author: "Chef Sarah", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Breakfast", serves: 1, rating: 4.5, steps: ["Blend acai", "Pour into bowl", "Add toppings", "Serve immediately"] },

  // Grilled (13 recipes)
  { name: "BBQ Ribs", description: "Fall-off-the-bone BBQ pork ribs", author: "Chef Tom", activeTime: "20 min", totalTime: "4 hrs", thumbnail: "", image: "", category: "Grilled", serves: 6, rating: 4.9, steps: ["Season ribs", "Low and slow cook", "Baste with sauce", "Finish on grill"] },
  { name: "Grilled Chicken", description: "Herb-marinated grilled chicken breast", author: "Chef John", activeTime: "15 min", totalTime: "30 min", thumbnail: "", image: "", category: "Grilled", serves: 4, rating: 4.7, steps: ["Marinate chicken", "Preheat grill", "Grill until done", "Rest and serve"] },
  { name: "Kebabs", description: "Mixed meat and vegetable skewers", author: "Chef Omar", activeTime: "20 min", totalTime: "25 min", thumbnail: "", image: "", category: "Grilled", serves: 4, rating: 4.6, steps: ["Cut meat and vegetables", "Thread on skewers", "Season and grill", "Serve with rice"] },
  { name: "Grilled Corn", description: "Smoky grilled corn with lime butter", author: "Chef Carlos", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Grilled", serves: 4, rating: 4.5, steps: ["Shuck corn", "Grill until charred", "Make lime butter", "Brush and serve"] },
  { name: "Burgers", description: "Classic American beef burgers", author: "Chef Tom", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Grilled", serves: 4, rating: 4.7, steps: ["Form patties", "Season generously", "Grill to desired doneness", "Assemble with toppings"] },
  { name: "Grilled Vegetables", description: "Seasonal vegetables on the grill", author: "Chef Sarah", activeTime: "15 min", totalTime: "20 min", thumbnail: "", image: "", category: "Grilled", serves: 4, rating: 4.5, steps: ["Slice vegetables", "Oil and season", "Grill until charred", "Serve warm"] },
  { name: "Shish Taouk", description: "Lebanese grilled chicken skewers", author: "Chef Omar", activeTime: "20 min", totalTime: "40 min", thumbnail: "", image: "", category: "Grilled", serves: 4, rating: 4.6, steps: ["Marinate chicken", "Thread on skewers", "Grill until cooked", "Serve with garlic sauce"] },
  { name: "Pork Chops", description: "Thick-cut grilled pork chops", author: "Chef Tom", activeTime: "10 min", totalTime: "20 min", thumbnail: "", image: "", category: "Grilled", serves: 2, rating: 4.5, steps: ["Season chops", "Grill over medium heat", "Flip once", "Rest before slicing"] },
  { name: "Grilled Pizza", description: "Crispy grilled pizza with fresh toppings", author: "Chef Maria", activeTime: "15 min", totalTime: "20 min", thumbnail: "", image: "", category: "Grilled", serves: 2, rating: 4.6, steps: ["Stretch dough", "Grill one side", "Add toppings", "Grill until melted"] },
  { name: "Satay Skewers", description: "Thai peanut sauce chicken skewers", author: "Chef Yuki", activeTime: "20 min", totalTime: "30 min", thumbnail: "", image: "", category: "Grilled", serves: 4, rating: 4.7, steps: ["Marinate chicken", "Make peanut sauce", "Grill skewers", "Serve with sauce"] },
  { name: "Lamb Kebabs", description: "Spiced lamb with yogurt sauce", author: "Chef Omar", activeTime: "20 min", totalTime: "30 min", thumbnail: "", image: "", category: "Grilled", serves: 4, rating: 4.6, steps: ["Season lamb", "Form around skewers", "Grill until done", "Serve with yogurt"] },
  { name: "Grilled Swordfish", description: "Meaty swordfish with lemon caper sauce", author: "Chef Pierre", activeTime: "10 min", totalTime: "15 min", thumbnail: "", image: "", category: "Grilled", serves: 2, rating: 4.5, steps: ["Season fish", "Grill over high heat", "Make caper sauce", "Serve immediately"] },
  { name: "Chicken Tikka", description: "Grilled marinated chicken pieces", author: "Chef Priya", activeTime: "20 min", totalTime: "40 min", thumbnail: "", image: "", category: "Grilled", serves: 4, rating: 4.7, steps: ["Marinate in yogurt", "Thread on skewers", "Grill until charred", "Serve with chutney"] },
];

// Pad or trim each category to exactly RECIPES_PER_CATEGORY, cloning
// existing recipes with a "II"/"III" suffix when a category is short.
const buildSeedRecipes = () => {
  const seeded = [];

  for (const category of categories) {
    const base = recipes.filter((r) => r.category === category);

    for (let i = 0; i < RECIPES_PER_CATEGORY; i++) {
      const source = base[i % base.length];
      const variant = Math.floor(i / base.length);
      const name = variant === 0 ? source.name : `${source.name} ${"I".repeat(variant + 1)}`;
      const keyword = foodKeywords[source.name] || source.category.toLowerCase();

      seeded.push({
        ...source,
        name,
        thumbnail: foodImage(keyword, 600, 450),
        image: foodImage(keyword, 900, 675),
      });
    }
  }

  return seeded;
};

export async function GET() {
  try {
    await dbConnect();

    const seedRecipes = buildSeedRecipes();

    // Clear existing recipes
    await Recipe.deleteMany({});

    // Insert new recipes
    const result = await Recipe.insertMany(seedRecipes);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${result.length} recipes`,
      count: result.length,
      categories: categories,
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
