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