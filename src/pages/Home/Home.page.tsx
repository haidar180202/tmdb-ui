import { RefreshCw, Film, Search, Flame, TrendingUp, Award, Sparkles, X } from 'lucide-react';
import { MovieCard, MovieSkeleton } from '../../components/MovieCard.component';
import { useHomeHook } from './Home.hook';
import type { MovieCategory } from '../../api/tmdb.api';

const CATEGORIES = [
  { id: 'now_playing', label: 'Now Playing', icon: Flame },
  { id: 'popular', label: 'Popular', icon: TrendingUp },
  { id: 'top_rated', label: 'Top Rated', icon: Award },
  { id: 'upcoming', label: 'Upcoming', icon: Sparkles }
] as const;

function _renderCategoryTabs(state: any, handlers: any) {
  return (
    <div className="flex gap-2 p-1 bg-slate-900 rounded-xl w-full md:w-auto overflow-x-auto">
      {CATEGORIES.map(cat => (
        <button 
          key={cat.id} 
          data-testid={`cat-${cat.id}`} 
          onClick={() => handlers.setActiveCategory(cat.id as MovieCategory)} 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${state.activeCategory === cat.id ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          <cat.icon className="w-4 h-4" /> {cat.label}
        </button>
      ))}
    </div>
  );
}

function _renderSearchBar(state: any, handlers: any) {
  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
      <input 
        role="searchbox" 
        value={state.searchQuery} 
        onChange={e => handlers.setSearchQuery(e.target.value)} 
        placeholder="Search movies..." 
        className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:border-amber-500 outline-none" 
      />
      {state.searchQuery && <X onClick={() => handlers.setSearchQuery('')} className="absolute right-2.5 top-2.5 w-4 h-4 cursor-pointer text-slate-400" />}
    </div>
  );
}

function _renderMoviesGrid(state: any) {
  if (state.movies.length > 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {state.movies.map((m: any) => <MovieCard key={m.id} movie={m} />)}
        {state.isLoading && Array.from({ length: 4 }).map((_, i) => <MovieSkeleton key={`sk-${i}`} />)}
      </div>
    );
  }
  if (state.isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => <MovieSkeleton key={`sk-${i}`} />)}
      </div>
    );
  }
  return (
    <div className="py-20 text-center">
      <Film className="w-12 h-12 text-slate-700 mx-auto mb-4" />
      <p className="text-slate-400">No movies found</p>
    </div>
  );
}

export function HomePage() {
  const { state, handlers, refs } = useHomeHook();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        {_renderCategoryTabs(state, handlers)}
        {_renderSearchBar(state, handlers)}
      </div>

      {state.error && (
        <div className="p-4 mb-6 bg-red-900/30 text-red-400 rounded-xl flex justify-between">
          {state.error} <button onClick={handlers.retry}><RefreshCw className="w-4 h-4" /></button>
        </div>
      )}

      {_renderMoviesGrid(state)}

      <div ref={refs.loadMoreRef} className="py-8 flex justify-center">
        {state.isLoading && <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />}
      </div>
    </main>
  );
}
