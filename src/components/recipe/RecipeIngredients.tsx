interface Ingredient {
  name: string;
  measure: string;
}

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Ingredients</h2>
      <ul className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-center space-x-3 py-1 border-b border-gray-100 last:border-0">
            <div className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0" />
            <div className="flex-grow">
              <span className="font-medium text-gray-900">{ingredient.name}</span>
              <span className="text-gray-500 text-sm ml-2">
                {ingredient.measure}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients; 