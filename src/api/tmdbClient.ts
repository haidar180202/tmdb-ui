import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    language: 'en-US',
  },
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    ...(ACCESS_TOKEN ? { Authorization: `Bearer ${ACCESS_TOKEN}` } : {}),
  },
});
