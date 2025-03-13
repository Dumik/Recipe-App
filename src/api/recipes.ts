import axios from 'axios';
import { API_ENDPOINTS } from '../constants/api';
import { RecipeResponse } from '../types/recipe';
import { APIError, validateRecipe } from '../utils/validators';

export const getRecipes = async (search?: string): Promise<RecipeResponse> => {
  try {
    const endpoint = `${API_ENDPOINTS.SEARCH}?s=${search || ''}`;
    const response = await axios.get<RecipeResponse>(endpoint);
    
    const meals = response.data.meals?.filter(validateRecipe) ?? [];
    return { meals };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new APIError('API rate limit exceeded. Please try again later.', 429, 'RATE_LIMIT');
      }
      throw new APIError(
        error.response?.data?.message || 'Failed to fetch recipes',
        error.response?.status
      );
    }
    throw new APIError('An unexpected error occurred');
  }
};

export const getRecipeById = async (id: string): Promise<RecipeResponse> => {
  try {
    const endpoint = `${API_ENDPOINTS.LOOKUP}?i=${id}`;
    const response = await axios.get<RecipeResponse>(endpoint);
    
    const recipe = response.data.meals?.[0];
    if (!recipe || !validateRecipe(recipe)) {
      throw new APIError('Recipe not found or invalid', 404, 'NOT_FOUND');
    }
    
    return { meals: [recipe] };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new APIError('API rate limit exceeded. Please try again later.', 429, 'RATE_LIMIT');
      }
      throw new APIError(
        error.response?.data?.message || 'Failed to fetch recipe details',
        error.response?.status
      );
    }
    throw new APIError('An unexpected error occurred');
  }
};

export const getRandomRecipe = async (): Promise<RecipeResponse> => {
  const response = await axios.get<RecipeResponse>(API_ENDPOINTS.RANDOM);
  return response.data;
};