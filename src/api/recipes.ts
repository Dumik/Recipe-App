import axios from 'axios';
import { API_ENDPOINTS } from '../constants/api';
import { RecipeResponse } from '../types/recipe';

export const getRecipes = async (search?: string): Promise<RecipeResponse> => {
  const endpoint = `${API_ENDPOINTS.SEARCH}?s=${search || ''}`;
  const response = await axios.get<RecipeResponse>(endpoint);
  return response.data;
};

export const getRecipeById = async (id: string): Promise<RecipeResponse> => {
  const endpoint = `${API_ENDPOINTS.LOOKUP}?i=${id}`;
  const response = await axios.get<RecipeResponse>(endpoint);
  return response.data;
};

export const getRandomRecipe = async (): Promise<RecipeResponse> => {
  const response = await axios.get<RecipeResponse>(API_ENDPOINTS.RANDOM);
  return response.data;
};