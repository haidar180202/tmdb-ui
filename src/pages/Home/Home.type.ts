import type { LucideIcon } from 'lucide-react';
import type { MovieCategory, Movie } from '../../api/tmdb.type';

export type CategoryItem = {
  id: MovieCategory;
  label: string;
  icon: LucideIcon;
};

export type HomeState = {
  activeCategory: MovieCategory;
  searchQuery: string;
  debouncedQuery: string;
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
};

export type HomeHandlers = {
  setActiveCategory: (cat: MovieCategory) => void;
  setSearchQuery: (query: string) => void;
  retry: () => void;
  loadMore: () => void;
};

export type HomeRefs = {
  loadMoreRef: React.MutableRefObject<HTMLDivElement | null>;
};

export type HomeHookReturn = {
  state: HomeState;
  handlers: HomeHandlers;
  refs: HomeRefs;
};

export type FetchMoviesReturn = {
  movies: Movie[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  fetchMovies: (targetPage: number, isNewSearch: boolean) => Promise<void>;
};
