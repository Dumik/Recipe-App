import { Recipe } from '../types/recipe';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, isSelectable, isSelected, onSelect }: RecipeCardProps) => {
  return (
    <div className="relative">
      <Link to={`/recipe/${recipe.idMeal}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
            <p className="text-gray-600">Category: {recipe.strCategory}</p>
            <p className="text-gray-600">Origin: {recipe.strArea}</p>
          </div>
        </div>
      </Link>
      {isSelectable && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onSelect?.(recipe);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isSelected
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Check className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default RecipeCard; 