import { useMemo } from 'react';
import { Recipe } from '../types/recipe';
import { extractIngredients } from '../utils/helpers';

interface CombinedIngredient {
  name: string;
  measures: string[];
  recipeSources: string[];
}

export const useCombinedIngredients = (recipes: Recipe[]) => {
  const combinedIngredients = useMemo(() => {
    const ingredientMap = new Map<string, CombinedIngredient>();

    recipes.forEach(recipe => {
      const ingredients = extractIngredients(recipe);
      
      ingredients.forEach(({ name, measure }) => {
        const key = name.toLowerCase();
        if (!ingredientMap.has(key)) {
          ingredientMap.set(key, {
            name,
            measures: [measure],
            recipeSources: [recipe.strMeal]
          });
        } else {
          const existing = ingredientMap.get(key)!;
          existing.measures.push(measure);
          existing.recipeSources.push(recipe.strMeal);
        }
      });
    });

    return Array.from(ingredientMap.values())
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [recipes]);

  return { combinedIngredients };
}; 