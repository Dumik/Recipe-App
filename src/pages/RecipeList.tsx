import React, { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { getRecipes } from '../api/recipes';
import { Recipe } from '../types/recipe';
import { debounce } from '../utils/helpers';

const ITEMS_PER_PAGE = 9;
const DEBOUNCE_DELAY = 300; // 300ms delay for debounce

const RecipeList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Search is handled through API
  const { data, isLoading, error } = useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => getRecipes(searchQuery)
  });

  // Category filtering is handled on the frontend
  const categories = useMemo(() => {
    if (!data?.meals) return [];
    const uniqueCategories = new Set(data.meals.map(recipe => recipe.strCategory));
    return Array.from(uniqueCategories).sort();
  }, [data?.meals]);

  // Apply category filtering on the frontend after getting data from API
  const filteredRecipes = useMemo(() => {
    if (!data?.meals) return [];
    if (!selectedCategory) return data.meals;
    return data.meals.filter(recipe => recipe.strCategory === selectedCategory);
  }, [data?.meals, selectedCategory]);

  // Pagination is handled on the frontend
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRecipes, currentPage]);

  // Debounced search that triggers API call
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
      setCurrentPage(1); // Reset to first page when search changes
      setSelectedCategory(''); // Reset category filter when searching
    }, DEBOUNCE_DELAY),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show 1-7, ellipsis, and last page
      for (let i = 1; i <= 7; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === 'number' && setCurrentPage(page)}
        className={`px-3 py-1 mx-1 rounded ${
          currentPage === page
            ? 'bg-blue-500 text-white'
            : page === '...'
            ? 'cursor-default'
            : 'hover:bg-gray-100'
        }`}
        disabled={page === '...'}
      >
        {page}
      </button>
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading recipes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error loading recipes</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">All Recipes</h1>
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedRecipes.map((recipe) => (
          <div key={recipe.idMeal} className="bg-white rounded-lg shadow-md overflow-hidden">
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
        ))}
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No recipes found</p>
        </div>
      ) : (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {renderPaginationNumbers()}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeList;