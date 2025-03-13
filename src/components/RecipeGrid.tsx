import React from 'react';
import { Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';
import { UtensilsCrossed } from 'lucide-react';

interface RecipeGridProps {
  recipes: Recipe[];
  isLoading: boolean;
  onSelect: (recipe: Recipe) => void;
  isSelected: (recipeId: string) => boolean;
}

const LoadingState = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-lg text-gray-600">Loading recipes...</div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
    <UtensilsCrossed className="w-12 h-12 text-gray-400 mb-4" />
    <h3 className="text-xl font-medium text-gray-900 mb-2">No recipes found</h3>
    <p className="text-gray-500 max-w-md">
      Try adjusting your search or filter criteria to find what you're looking for
    </p>
  </div>
);

const RecipeGrid = React.memo(({ 
  recipes,
  isLoading,
  onSelect,
  isSelected 
}: RecipeGridProps) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (recipes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.idMeal} 
          recipe={recipe}
          isSelectable
          isSelected={isSelected(recipe.idMeal)}
          onSelect={() => onSelect(recipe)}
        />
      ))}
    </div>
  );
});

RecipeGrid.displayName = 'RecipeGrid';

export default RecipeGrid; 