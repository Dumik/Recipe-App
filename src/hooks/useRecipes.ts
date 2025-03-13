import { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRecipes, getRecipeById } from '../api/recipes';
import { ITEMS_PER_PAGE, CACHE_CONFIG } from '../constants/config';
import { QUERY_KEYS } from '../constants/queryKeys';
import { Recipe, RecipeResponse } from '../types/recipe';

export const useRecipes = (searchQuery: string) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const { data, isLoading, error } = useQuery<RecipeResponse>({
    queryKey: QUERY_KEYS.RECIPES.search(searchQuery),
    queryFn: () => getRecipes(searchQuery),
    ...CACHE_CONFIG.SHORT,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const prefetchRecipeDetails = useCallback((recipe: Recipe) => {
    if (!queryClient.getQueryData(QUERY_KEYS.RECIPES.details(recipe.idMeal))) {
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.RECIPES.details(recipe.idMeal),
        queryFn: () => getRecipeById(recipe.idMeal),
        ...CACHE_CONFIG.SHORT,
      });
    }
  }, [queryClient]);

  const categories = useMemo(() => {
    if (!data?.meals) return [];
    const uniqueCategories = new Set(data.meals.map(recipe => recipe.strCategory));
    return Array.from(uniqueCategories).sort();
  }, [data?.meals]);

  const filteredRecipes = useMemo(() => {
    if (!data?.meals) return [];
    if (!selectedCategory) return data.meals;
    return data.meals.filter(recipe => recipe.strCategory === selectedCategory);
  }, [data?.meals, selectedCategory]);

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const recipes = filteredRecipes.slice(startIndex, endIndex);
    
    recipes.forEach(prefetchRecipeDetails);

    if (currentPage < totalPages && !isLoading) {
      const nextPageRecipes = filteredRecipes.slice(endIndex, endIndex + ITEMS_PER_PAGE);
      nextPageRecipes.forEach(prefetchRecipeDetails);
    }

    return recipes;
  }, [filteredRecipes, currentPage, totalPages, prefetchRecipeDetails, isLoading]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    recipes: paginatedRecipes,
    categories,
    selectedCategory,
    currentPage,
    totalPages,
    isLoading,
    error,
    handleCategoryChange,
    handlePageChange
  };
}; 