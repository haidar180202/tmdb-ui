import axios from 'axios';

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

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { language: 'en-US' },
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    ...(ACCESS_TOKEN ? { Authorization: `Bearer ${ACCESS_TOKEN}` } : {}),
  },
});

export const tmdbApi = {
  getMoviesByCategory: async (category: MovieCategory, page = 1) => 
    (await client.get<PaginatedResponse<Movie>>(`/movie/${category}`, { params: { page } })).data,
  
  searchMovies: async (query: string, page = 1) => 
    (await client.get<PaginatedResponse<Movie>>('/search/movie', { params: { query, page, include_adult: false } })).data,
  
  getMovieDetail: async (id: number) => 
    (await client.get<MovieDetail>(`/movie/${id}`, { params: { append_to_response: 'credits' } })).data,
};
