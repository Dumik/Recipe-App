import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecipeById } from '../api/recipes';
import { QUERY_KEYS } from '../constants/queryKeys';
import { RecipeResponse } from '../types/recipe';
import { CACHE_CONFIG } from '../constants/config';
import { extractIngredients } from '../utils/helpers';
import RecipeNavigation from '../components/recipe/RecipeNavigation';
import RecipeHero from '../components/recipe/RecipeHero';
import RecipeIngredients from '../components/recipe/RecipeIngredients';
import RecipeInstructions from '../components/recipe/RecipeInstructions';
import RecipeVideo from '../components/recipe/RecipeVideo';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<RecipeResponse>({
    queryKey: QUERY_KEYS.RECIPES.details(id!),
    queryFn: () => getRecipeById(id!),
    ...CACHE_CONFIG.SHORT,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-lg text-gray-600">Loading recipe details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-lg text-red-600 mb-4">Error loading recipe</div>
        <RecipeNavigation />
      </div>
    );
  }

  const recipe = data?.meals?.[0];

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-lg mb-4">Recipe not found</div>
        <RecipeNavigation />
      </div>
    );
  }

  const ingredients = extractIngredients(recipe);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <RecipeNavigation />
      
      <RecipeHero
        image={recipe.strMealThumb}
        title={recipe.strMeal}
        category={recipe.strCategory}
        area={recipe.strArea}
        tags={recipe.strTags}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <RecipeIngredients ingredients={ingredients} />
        </div>

        <div className="lg:col-span-2">
          <RecipeInstructions instructions={recipe.strInstructions} />
        </div>
      </div>

      <RecipeVideo videoUrl={recipe.strYoutube} />
    </div>
  );
};

export default RecipeDetails;