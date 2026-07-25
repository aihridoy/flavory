/* eslint-disable no-undef */

import { signIn, signOut } from "next-auth/react";

export const fetchRecipes = async () => {
    try {
      const response = await fetch(`/api/recipes?limit=0`,
        {
            method: 'GET',
            cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return { success: false, message: error.message };
    }
  };

  export const fetchRecipesPaginated = async (page = 1, limit = 12) => {
    try {
      const response = await fetch(`/api/recipes?page=${page}&limit=${limit}`,
        {
            method: 'GET',
            cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return { success: false, message: error.message };
    }
  };

  export const fetchRecipeById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipes/${id}`, 
            {
                method: 'GET',
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch recipe");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return { success: false, message: error.message };
    }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`/api/recipes/categories`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { success: false, message: error.message };
  }
};

export const fetchRecipesByCategory = async (categoryName) => {
  try {
    const encodedCategory = encodeURIComponent(categoryName);
    const response = await fetch(`/api/recipes/category/${encodedCategory}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch recipes by category");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return { success: false, message: error.message };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data; 
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: error.message };
  }
};

export const loginUser = async (credentials) => {
  try {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false, 
    });
    if (!result || result.error) {
      throw new Error(result?.error || "Invalid email or password");
    }
    return { success: true, message: "Login successful!" };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: error.message || "Login failed" };
  }
};

export const logoutUser = async () => {
  try {
    await signOut({ redirect: false });
    return { success: true, message: "Logged out successfully!" };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, message: error.message || "Logout failed" };
  }
};

export const addToFavorites = async (userId, recipe) => {
  try {
    const { _id, name, image, author, rating } = recipe;

    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, recipeId: _id, name, image, author, rating }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add recipe to favorites');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const checkIfFavorited = async (userId, recipeId) => {
  try {
    const response = await fetch(
      `/api/favorites?userId=${userId}&recipeId=${recipeId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to check favorite status');
    }

    return { success: true, isFavorited: data.isFavorited, favoriteId: data.favoriteId };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const fetchUserFavorites = async (userId) => {
  try {
    const response = await fetch(`/api/favorites?userId=${userId}`, {
      method: 'GET',
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch favorites');
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const removeFavorite = async (userId, favoriteId) => {
  try {
    const response = await fetch(
      `/api/favorites?userId=${userId}&favoriteId=${favoriteId}`,
      { method: 'DELETE' }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to remove favorite');
    }

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
