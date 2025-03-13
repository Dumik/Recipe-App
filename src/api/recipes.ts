import axios from 'axios';
import { RecipeResponse } from '../types/recipe';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const getRecipes = async (search?: string): Promise<RecipeResponse> => {
  const endpoint = search 
    ? `${API_BASE_URL}/search.php?s=${search}`
    : `${API_BASE_URL}/search.php?s=`;
  const response = await axios.get<RecipeResponse>(endpoint);
  return response.data;
};

export const getRecipeById = async (id: string): Promise<RecipeResponse> => {
  const response = await axios.get<RecipeResponse>(`${API_BASE_URL}/lookup.php?i=${id}`);
  return response.data;
};