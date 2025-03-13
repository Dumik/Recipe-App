import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RecipeNavigation = () => {
  return (
    <Link 
      to="/" 
      className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back to Recipes
    </Link>
  );
};

export default RecipeNavigation; 