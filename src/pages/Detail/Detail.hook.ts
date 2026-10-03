import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbApi, type MovieDetail } from '../../api/tmdb.api';

export function useDetailHook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieId = id ? Number(id) : null;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;
    let mounted = true; setIsLoading(true); setError(null);
    tmdbApi.getMovieDetail(movieId)
      .then(data => { if(mounted) setMovie(data); })
      .catch(err => { if(mounted) setError(err.message); })
      .finally(() => { if(mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, [movieId]);

  return {
    state: { movie, isLoading, error },
    handlers: { goBack: () => navigate(-1) }
  };
}
