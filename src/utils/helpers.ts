import { Recipe, Ingredient } from '../types/recipe';

export const extractIngredients = (recipe: Recipe): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}` as keyof Recipe] as string;
    const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;
    
    if (name && name.trim() !== '') {
      ingredients.push({
        name: name.trim(),
        measure: measure?.trim() || ''
      });
    }
  }
  
  return ingredients;
};

