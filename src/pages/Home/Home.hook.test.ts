import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useHomeHook } from './Home.hook';

describe('Hook: useHomeHook', () => {
  it('should initialize with default popular category', () => {
    const { result } = renderHook(() => useHomeHook());
    expect(result.current.state.activeCategory).toBe('popular');
  });

  it('should update active category when handler is called', () => {
    const { result } = renderHook(() => useHomeHook());
    act(() => {
      result.current.handlers.setActiveCategory('upcoming');
    });
    expect(result.current.state.activeCategory).toBe('upcoming');
    expect(result.current.state.searchQuery).toBe('');
  });
});
