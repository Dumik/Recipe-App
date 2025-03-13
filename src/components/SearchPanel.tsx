import React from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';

interface SearchPanelProps {
  categories: string[];
  selectedCategory: string;
  searchValue: string;
  onSearch: (value: string) => void;
  onCategoryChange: (category: string) => void;
}

const SearchPanel = React.memo(({ 
  categories, 
  selectedCategory, 
  searchValue,
  onSearch,
  onCategoryChange 
}: SearchPanelProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
      <SearchBar value={searchValue} onSearch={onSearch} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
});

SearchPanel.displayName = 'SearchPanel';

export default SearchPanel; 