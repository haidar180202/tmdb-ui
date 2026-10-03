export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  runtime: number | null;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
