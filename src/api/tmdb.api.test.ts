import { describe, it, expect, vi } from 'vitest';
import { tmdbApi } from './tmdb.api';

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn((url: string) => {
        if (url.includes('search')) return Promise.resolve({ data: { results: ['search_result'] } });
        if (url.includes('popular')) return Promise.resolve({ data: { results: ['popular_result'] } });
        if (url.includes('/movie/123')) return Promise.resolve({ data: { id: 123, title: 'Detail' } });
        return Promise.resolve({ data: {} });
      })
    }))
  }
}));

describe('API: tmdb.api', () => {
  it('handles getMoviesByCategory correctly', async () => {
    const res = await tmdbApi.getMoviesByCategory('popular', 1);
    expect(res.results[0]).toBe('popular_result');
  });

  it('handles searchMovies correctly', async () => {
    const res = await tmdbApi.searchMovies('Avatar', 1);
    expect(res.results[0]).toBe('search_result');
  });

  it('handles getMovieDetail correctly', async () => {
    const res = await tmdbApi.getMovieDetail(123);
    expect(res.title).toBe('Detail');
  });
});
