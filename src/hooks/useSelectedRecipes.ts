import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Recipe, RecipeResponse } from '../types/recipe';
import { getRecipeById } from '../api/recipes';
import { QUERY_KEYS } from '../constants/queryKeys';
import { CACHE_CONFIG } from '../constants/config';
import { safeJsonParse, isStringArray } from '../utils/safeJson';

const SELECTED_RECIPES_KEY = 'selectedRecipeIds';

export const useSelectedRecipes = () => {
  const queryClient = useQueryClient();

  const { data: selectedRecipeIds = [] } = useQuery<string[]>({
    queryKey: QUERY_KEYS.SELECTED_RECIPES.ids,
    queryFn: () => {
      const saved = localStorage.getItem(SELECTED_RECIPES_KEY);
      return saved 
        ? safeJsonParse(saved, isStringArray, [])
        : [];
    },
    ...CACHE_CONFIG.INFINITE,
  });

  const { data: selectedRecipes = [] } = useQuery<Recipe[]>({
    queryKey: QUERY_KEYS.SELECTED_RECIPES.list(selectedRecipeIds),
    queryFn: async () => {
      if (selectedRecipeIds.length === 0) return [];
      const recipes = await Promise.all(
        selectedRecipeIds.map(async (id) => {
          const cached = queryClient.getQueryData<RecipeResponse>(
            QUERY_KEYS.RECIPES.details(id)
          );
          if (cached?.meals?.[0]) {
            return cached.meals[0];
          }
          const response = await getRecipeById(id);
          return response.meals[0];
        })
      );
      return recipes.filter((recipe): recipe is Recipe => Boolean(recipe));
    },
    enabled: selectedRecipeIds.length > 0,
    ...CACHE_CONFIG.SHORT,
  });

  const { mutate: updateSelectedRecipeIds } = useMutation({
    mutationFn: async (newIds: string[]) => {
      localStorage.setItem(SELECTED_RECIPES_KEY, JSON.stringify(newIds));
      return newIds;
    },
    onSuccess: (newIds) => {
      queryClient.setQueryData(QUERY_KEYS.SELECTED_RECIPES.ids, newIds);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SELECTED_RECIPES.list(newIds),
      });
    },
  });

  const addRecipe = (recipe: Recipe) => {
    const newIds = [...selectedRecipeIds];
    if (!newIds.includes(recipe.idMeal)) {
      queryClient.setQueryData<RecipeResponse>(
        QUERY_KEYS.RECIPES.details(recipe.idMeal),
        { meals: [recipe] }
      );
      newIds.push(recipe.idMeal);
      updateSelectedRecipeIds(newIds);
    }
  };

  const removeRecipe = (recipeId: string) => {
    const newIds = selectedRecipeIds.filter(id => id !== recipeId);
    updateSelectedRecipeIds(newIds);
  };

  const isSelected = (recipeId: string) => {
    return selectedRecipeIds.includes(recipeId);
  };


  return {
    selectedRecipes,
    addRecipe,
    removeRecipe,
    isSelected
  };
}; 