import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
}

export function SearchBar({ searchQuery, onSearchChange, onClearSearch }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          role="searchbox"
          placeholder="Search movies by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-slate-900/80 border border-slate-800 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 rounded-xl text-slate-100 placeholder-slate-500 text-sm outline-none transition-all duration-200 backdrop-blur-sm shadow-inner"
        />
        {searchQuery && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={onClearSearch}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
