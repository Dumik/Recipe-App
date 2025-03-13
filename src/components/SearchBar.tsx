import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchBar = ({ value, onSearch }: SearchBarProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        placeholder="Search recipes..."
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      {value && (
        <button
          onClick={() => onSearch('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar; 