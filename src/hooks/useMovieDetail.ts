import { useState, useEffect } from 'react';
import type { MovieDetail } from '../types/tmdb';
import { movieService } from '../api/movieService';

export function useMovieDetail(id: number | null) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    movieService.getMovieDetail(id)
      .then((data) => {
        if (isMounted) setMovie(data);
      })
      .catch((err: any) => {
        if (isMounted) setError(err.message || 'Failed to fetch movie details');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { movie, isLoading, error };
}
