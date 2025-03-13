import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { safeJsonParse, isCheckedItems } from '../../utils/safeJson';

interface Ingredient {
  name: string;
  measures: string[];
  recipeSources: string[];
}

interface ShoppingListProps {
  ingredients: Ingredient[];
}

const ShoppingList = ({ ingredients }: ShoppingListProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('shopping-list-checked');
    return saved 
      ? safeJsonParse(saved, isCheckedItems, {})
      : {};
  });

  useEffect(() => {
    localStorage.setItem('shopping-list-checked', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (ingredientName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [ingredientName]: !prev[ingredientName]
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Shopping List</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ul className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <li 
              key={index} 
              className={`border-b pb-4 last:border-b-0 transition-colors ${
                checkedItems[ingredient.name] ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleItem(ingredient.name)}
                  className={`mt-1 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                    checkedItems[ingredient.name]
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {checkedItems[ingredient.name] && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <span className={`font-medium text-lg transition-colors ${
                      checkedItems[ingredient.name] ? 'text-gray-400 line-through' : 'text-gray-900'
                    }`}>
                      {ingredient.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Used in {ingredient.recipeSources.length} {ingredient.recipeSources.length === 1 ? 'recipe' : 'recipes'}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {ingredient.measures.map((measure, idx) => (
                      <li 
                        key={idx} 
                        className={`flex items-center transition-colors ${
                          checkedItems[ingredient.name] ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm mr-2">
                          {idx + 1}
                        </span>
                        <span>{measure}</span>
                        <span className="ml-2 text-gray-400">
                          ({ingredient.recipeSources[idx]})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList; 