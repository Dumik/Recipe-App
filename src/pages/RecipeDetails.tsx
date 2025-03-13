import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecipeById } from '../api/recipes';

const RecipeDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id!)
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipe</div>;
  }

  const recipe = data?.meals?.[0];

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6">{recipe.strMeal}</h1>
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="w-full max-w-2xl rounded-lg mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <p className="mb-2"><strong>Category:</strong> {recipe.strCategory}</p>
          <p className="mb-2"><strong>Origin:</strong> {recipe.strArea}</p>
          {recipe.strTags && (
            <p className="mb-2"><strong>Tags:</strong> {recipe.strTags}</p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <p className="whitespace-pre-line">{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;