import { Recipe } from '../types/recipe';

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const validateRecipe = (recipe: Partial<Recipe>): recipe is Recipe => {
  return Boolean(
    recipe &&
    recipe.idMeal &&
    recipe.strMeal &&
    recipe.strCategory &&
    recipe.strMealThumb
  );
};

export const isApiLimitError = (error: unknown): boolean => {
  if (error instanceof APIError) {
    return error.status === 429 || error.message.toLowerCase().includes('limit');
  }
  return false;
}; 