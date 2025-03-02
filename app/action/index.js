/* eslint-disable no-undef */
"use client";

import { signIn, signOut } from "next-auth/react";

export const fetchRecipes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipes`, 
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

export const fetchRecipesByCategory = async (categoryName) => {
  try {
    const encodedCategory = encodeURIComponent(categoryName);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipes/category/${encodedCategory}`);

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
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
    console.log("Attempting to login with:", credentials);

    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    console.log("SignIn result:", result);

    if (!result || !result.ok) {
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