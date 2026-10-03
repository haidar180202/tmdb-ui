import { tmdbClient } from './tmdbClient';
import type { Movie, MovieDetail, PaginatedResponse, MovieCategory } from '../types/tmdb';

export const movieService = {
  getMoviesByCategory: async (category: MovieCategory, page: number = 1): Promise<PaginatedResponse<Movie>> => {
    const response = await tmdbClient.get<PaginatedResponse<Movie>>(`/movie/${category}`, {
      params: { page },
    });
    return response.data;
  },

  searchMovies: async (query: string, page: number = 1): Promise<PaginatedResponse<Movie>> => {
    const response = await tmdbClient.get<PaginatedResponse<Movie>>('/search/movie', {
      params: { query, page, include_adult: false },
    });
    return response.data;
  },

  getMovieDetail: async (id: number): Promise<MovieDetail> => {
    const response = await tmdbClient.get<MovieDetail>(`/movie/${id}`, {
      params: {
        append_to_response: 'credits',
      },
    });
    return response.data;
  },
};
