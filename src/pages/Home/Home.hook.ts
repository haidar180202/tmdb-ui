import { useState, useEffect, useCallback, useRef } from 'react';
import { tmdbApi } from '../../api/tmdb.api';
import type { Movie, MovieCategory } from '../../api/tmdb.type';
import type { HomeHookReturn, FetchMoviesReturn } from './Home.type';

/**
 * Delays state updates to prevent rapid consecutive re-renders.
 * @param {T} value - State to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {T} The debounced value.
 */
function _useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

/**
 * Tracks element visibility to trigger infinite scroll.
 * @param {boolean} hasMore - Boolean indicating if more pages exist.
 * @param {boolean} isLoading - Boolean indicating current fetch status.
 * @param {Function} loadMore - Callback to trigger next page fetch.
 * @returns {React.MutableRefObject<HTMLDivElement | null>} React ref to attach to the sentinel element.
 */
function _useIntersectionObserver(hasMore: boolean, isLoading: boolean, loadMore: () => void) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting && hasMore && !isLoading) loadMore();
    }, { threshold: 0.1, rootMargin: '100px' });
    
    if (loadMoreRef.current) obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [hasMore, isLoading, loadMore]);

  return loadMoreRef;
}

/**
 * Manages fetching movies based on category or search query.
 * @param {MovieCategory} category - Current active category.
 * @param {string} debouncedQuery - Current active search query.
 * @returns {FetchMoviesReturn} Pagination and state for fetching movies.
 */
function _useFetchMovies(category: MovieCategory, debouncedQuery: string): FetchMoviesReturn {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (targetPage: number, isNewSearch: boolean) => {
    setIsLoading(true); setError(null);
    try {
      const data = debouncedQuery 
        ? await tmdbApi.searchMovies(debouncedQuery, targetPage)
        : await tmdbApi.getMoviesByCategory(category, targetPage);

      setMovies(prev => {
        if (isNewSearch) return data.results;
        const existingIds = new Set(prev.map(m => m.id));
        const unique = data.results.filter(m => !existingIds.has(m.id));
        return [...prev, ...unique];
      });
      setTotalPages(data.total_pages); setPage(targetPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  }, [category, debouncedQuery]);

  return { movies, page, totalPages, isLoading, error, fetchMovies };
}

/**
 * Main hook that composes state, handlers, and refs for HomePage.
 * @returns {HomeHookReturn} The hook's composed logic.
 */
export function useHomeHook(): HomeHookReturn {
  const [activeCategory, setActiveCategory] = useState<MovieCategory>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = _useDebounce(searchQuery, 500);

  const { movies, page, totalPages, isLoading, error, fetchMovies } = _useFetchMovies(activeCategory, debouncedQuery);

  useEffect(() => {
    fetchMovies(1, true);
  }, [fetchMovies]);

  const hasMore = page < totalPages;
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) fetchMovies(page + 1, false);
  }, [isLoading, hasMore, page, fetchMovies]);

  const loadMoreRef = _useIntersectionObserver(hasMore, isLoading, loadMore);

  return {
    state: { activeCategory, searchQuery, debouncedQuery, movies, isLoading, error, hasMore },
    handlers: { 
      setActiveCategory: (cat: MovieCategory) => { setActiveCategory(cat); setSearchQuery(''); }, 
      setSearchQuery, 
      retry: () => fetchMovies(1, true), 
      loadMore 
    },
    refs: { loadMoreRef }
  };
}
