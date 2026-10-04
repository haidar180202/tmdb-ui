import type { MovieDetail } from '../../api/tmdb.type';

export type DetailState = {
  movie: MovieDetail | null;
  isLoading: boolean;
  error: string | null;
};

export type DetailHandlers = {
  goBack: () => void;
};

export type DetailHookReturn = {
  state: DetailState;
  handlers: DetailHandlers;
};