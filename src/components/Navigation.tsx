import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <UtensilsCrossed className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Recipe App</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Recipes
            </Link>
            <Link
              to="/selected"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Selected Recipes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 