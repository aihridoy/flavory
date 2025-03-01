/* eslint-disable no-undef */
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