import { useState, useEffect, useCallback } from 'react';
import type { Movie, MovieCategory } from '../types/tmdb';
import { movieService } from '../api/movieService';

export function useMovies(category: MovieCategory, searchQuery: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (targetPage: number, isNewSearch: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      let data;
      if (searchQuery) {
        data = await movieService.searchMovies(searchQuery, targetPage);
      } else {
        data = await movieService.getMoviesByCategory(category, targetPage);
      }

      setMovies((prev) => {
        if (isNewSearch) return data.results;
        // Deduplicate movies just in case the API returns overlapping items
        const existingIds = new Set(prev.map(m => m.id));
        const uniqueNew = data.results.filter(m => !existingIds.has(m.id));
        return [...prev, ...uniqueNew];
      });
      setTotalPages(data.total_pages);
      setPage(targetPage);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  }, [category, searchQuery]);

  useEffect(() => {
    setPage(1);
    fetchMovies(1, true);
  }, [category, searchQuery, fetchMovies]);

  const loadMore = useCallback(() => {
    if (!isLoading && page < totalPages) {
      fetchMovies(page + 1, false);
    }
  }, [isLoading, page, totalPages, fetchMovies]);

  return {
    movies,
    isLoading,
    error,
    hasMore: page < totalPages,
    loadMore,
    retry: () => fetchMovies(1, true)
  };
}
