import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Film } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { CategoryTabs } from '../components/CategoryTabs';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { MovieSkeleton } from '../components/MovieSkeleton';
import { useDebounce } from '../hooks/useDebounce';
import { useMovies } from '../hooks/useMovies';
import type { MovieCategory } from '../types/tmdb';

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<MovieCategory>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { movies, isLoading, error, hasMore, loadMore, retry } = useMovies(activeCategory, debouncedQuery);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTarget = loadMoreRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isLoading, loadMore]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <CategoryTabs
              activeCategory={activeCategory}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                setSearchQuery('');
              }}
            />
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          </div>

          {error && (
            <div className="p-4 bg-amber-950/40 border border-amber-800/40 rounded-2xl flex items-center justify-between text-amber-300 text-sm">
              <span>{error}</span>
              <button onClick={retry} className="flex items-center gap-1 hover:underline">
                <RefreshCw className="w-4 h-4" /> Retry
              </button>
            </div>
          )}

          <div className="border-b border-slate-800/80 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {debouncedQuery ? (
                <>Search Results for <span className="text-amber-400">"{debouncedQuery}"</span></>
              ) : (
                'Discover Movies'
              )}
            </h2>
          </div>

          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
              {isLoading && Array.from({ length: 4 }).map((_, i) => <MovieSkeleton key={`loading-${i}`} />)}
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <MovieSkeleton key={`skeleton-${i}`} />)}
            </div>
          ) : !error ? (
            <div className="py-20 text-center max-w-md mx-auto">
              <Film className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-bold">No movies found</h3>
              <p className="text-slate-400 text-sm mt-2">Try adjusting your search query or clear the filter.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Clear Search Filter
              </button>
            </div>
          ) : null}

          {/* Sentinel for Infinite Scroll */}
          <div ref={loadMoreRef} className="py-8 flex justify-center">
            {isLoading && movies.length > 0 && (
              <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
            )}
            {!isLoading && hasMore && (
              <button onClick={loadMore} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-semibold transition-colors">
                Load More
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
