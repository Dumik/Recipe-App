import { useState, useCallback } from 'react';
import Pagination from '../components/Pagination';
import { useRecipes } from '../hooks/useRecipes';
import { useSelectedRecipes } from '../hooks/useSelectedRecipes';
import { DEBOUNCE_DELAY } from '../constants/config';
import { useDebounce } from '../hooks/useDebounce';
import { Recipe } from '../types/recipe';
import SearchPanel from '../components/SearchPanel';
import RecipeGrid from '../components/RecipeGrid';

const RecipeList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const { addRecipe, removeRecipe, isSelected } = useSelectedRecipes();
  
  const debouncedSearch = useDebounce((value: string) => {
    setDebouncedValue(value);
  }, DEBOUNCE_DELAY);

  const handleSearch = useCallback((value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  }, [debouncedSearch]);
  
  const {
    recipes,
    categories,
    selectedCategory,
    currentPage,
    totalPages,
    isLoading,
    error,
    handleCategoryChange,
    handlePageChange
  } = useRecipes(debouncedValue);

  const handleRecipeSelect = useCallback((recipe: Recipe) => {
    if (isSelected(recipe.idMeal)) {
      removeRecipe(recipe.idMeal);
    } else {
      addRecipe(recipe);
    }
  }, [isSelected, removeRecipe, addRecipe]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error loading recipes</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">All Recipes</h1>
        <SearchPanel 
          categories={categories}
          selectedCategory={selectedCategory}
          searchValue={searchInput}
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <RecipeGrid 
        recipes={recipes}
        isLoading={isLoading}
        onSelect={handleRecipeSelect}
        isSelected={isSelected}
      />

      {!isLoading && recipes.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default RecipeList;