const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';
const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60';
const FALLBACK_BACKDROP = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80';

export const getPosterUrl = (path: string | null): string => {
  if (!path) return FALLBACK_POSTER;
  return path.startsWith('http') ? path : `${TMDB_IMAGE_BASE}${path}`;
};

export const getBackdropUrl = (path: string | null): string => {
  if (!path) return FALLBACK_BACKDROP;
  return path.startsWith('http') ? path : `${TMDB_BACKDROP_BASE}${path}`;
};
