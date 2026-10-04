import axios from 'axios';
import type { Movie, MovieDetail, PaginatedResponse, MovieCategory } from './tmdb.type';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { language: 'en-US' },
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${ACCESS_TOKEN}`
  },
});

export const tmdbApi = {
  /**
   * Fetches movies by category.
   * @param {MovieCategory} category - Category to fetch.
   * @param {number} [page=1] - Page number.
   * @returns {Promise<PaginatedResponse<Movie>>} Paginated movie list.
   */
  getMoviesByCategory: async (category: MovieCategory, page = 1) => 
    (await client.get<PaginatedResponse<Movie>>(`/movie/${category}`, { params: { page } })).data,
  
  /**
   * Searches movies by text.
   * @param {string} query - Text keyword to search.
   * @param {number} [page=1] - Page number.
   * @returns {Promise<PaginatedResponse<Movie>>} Paginated search results.
   */
  searchMovies: async (query: string, page = 1) => 
    (await client.get<PaginatedResponse<Movie>>('/search/movie', { params: { query, page, include_adult: false } })).data,
  
  /**
   * Gets full details of a specific movie.
   * @param {number} id - TMDB Movie ID.
   * @returns {Promise<MovieDetail>} Movie details with cast/crew.
   */
  getMovieDetail: async (id: number) => 
    (await client.get<MovieDetail>(`/movie/${id}`, { params: { append_to_response: 'credits' } })).data,
};
