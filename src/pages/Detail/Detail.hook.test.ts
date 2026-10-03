import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDetailHook } from './Detail.hook';
import { tmdbApi } from '../../api/tmdb.api';
import * as routerModule from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(() => mockNavigate)
}));

vi.mock('../../api/tmdb.api', () => ({
  tmdbApi: { getMovieDetail: vi.fn() }
}));

describe('Hook: useDetailHook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles missing movieId from URL', () => {
    (routerModule.useParams as any).mockReturnValue({}); // No ID
    const { result } = renderHook(() => useDetailHook());
    expect(result.current.state.isLoading).toBe(false);
    expect(tmdbApi.getMovieDetail).not.toHaveBeenCalled();
  });

  it('handles API errors correctly', async () => {
    (routerModule.useParams as any).mockReturnValue({ id: '123' });
    (tmdbApi.getMovieDetail as any).mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useDetailHook());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.state.isLoading).toBe(false);
    expect(result.current.state.error).toBe('Network Error');
    expect(result.current.state.movie).toBeNull();
  });

  it('cleans up correctly on unmount with error', async () => {
    (routerModule.useParams as any).mockReturnValue({ id: '123' });
    let rejectApi: any;
    (tmdbApi.getMovieDetail as any).mockReturnValue(new Promise((_, rej) => { rejectApi = rej; }));

    const { result, unmount } = renderHook(() => useDetailHook());
    expect(result.current.state.isLoading).toBe(true);

    unmount(); // Unmount before API rejects

    await act(async () => { 
      rejectApi(new Error('Ignore'));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  it('executes goBack handler correctly', () => {
    (routerModule.useParams as any).mockReturnValue({ id: '123' });
    (tmdbApi.getMovieDetail as any).mockResolvedValue({});
    const { result } = renderHook(() => useDetailHook());

    act(() => {
      result.current.handlers.goBack();
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
