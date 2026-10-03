import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMovieCardHook } from './MovieCard.hook';

describe('Hook: useMovieCardHook', () => {
  it('should initialize with imageLoaded as false', () => {
    const { result } = renderHook(() => useMovieCardHook());
    expect(result.current.state.imageLoaded).toBe(false);
  });

  it('should set imageLoaded to true when onImageLoad is called', () => {
    const { result } = renderHook(() => useMovieCardHook());
    
    act(() => {
      result.current.handlers.onImageLoad();
    });

    expect(result.current.state.imageLoaded).toBe(true);
  });
});
