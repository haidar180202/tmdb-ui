export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  runtime: number | null;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string; profile_path: string | null }[];
  };
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
}

export type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
