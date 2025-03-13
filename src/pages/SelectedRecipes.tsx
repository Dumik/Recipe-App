import { useSelectedRecipes } from '../hooks/useSelectedRecipes';
import { useCombinedIngredients } from '../hooks/useCombinedIngredients';
import RecipeCard from '../components/RecipeCard';
import ShoppingList from '../components/recipe/ShoppingList';
import { Link } from 'react-router-dom';

const SelectedRecipes = () => {
  const { selectedRecipes, removeRecipe } = useSelectedRecipes();
  const { combinedIngredients } = useCombinedIngredients(selectedRecipes);

  if (selectedRecipes.length === 0) {
    return (
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">Selected Recipes</h1>
        <p className="text-gray-600 mb-4">No recipes selected yet</p>
        <Link 
          to="/" 
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Selected Recipes ({selectedRecipes.length})</h1>
        <Link 
          to="/" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add More Recipes
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                isSelectable
                isSelected
                onSelect={() => removeRecipe(recipe.idMeal)}
              />
            ))}
          </div>
        </div>

        <div>
          <ShoppingList ingredients={combinedIngredients} />
        </div>
      </div>
    </div>
  );
};

export default SelectedRecipes;