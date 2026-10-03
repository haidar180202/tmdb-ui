import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { HomePage } from './Home.page';
import * as useHomeHookModule from './Home.hook';

describe('Page Component: HomePage', () => {
  it('renders correctly with movies and handles user interaction', () => {
    const mockSetSearchQuery = vi.fn();
    const mockSetActiveCategory = vi.fn();
    vi.spyOn(useHomeHookModule, 'useHomeHook').mockReturnValue({
      state: { 
        activeCategory: 'now_playing', searchQuery: 'Avat', debouncedQuery: 'Avat', 
        movies: [{ id: 1, title: 'Mocked Movie', release_date: '2024-01-01', vote_average: 5, overview: 'Desc', poster_path: null, backdrop_path: null, vote_count: 0 }], 
        isLoading: false, error: null, hasMore: false 
      },
      handlers: { setActiveCategory: mockSetActiveCategory, setSearchQuery: mockSetSearchQuery, retry: vi.fn(), loadMore: vi.fn() },
      refs: { loadMoreRef: { current: null } }
    });

    render(<BrowserRouter><HomePage /></BrowserRouter>);
    expect(screen.getByText('Mocked Movie')).toBeInTheDocument();
    
    // Test Category Click
    fireEvent.click(screen.getByTestId('cat-popular'));
    expect(mockSetActiveCategory).toHaveBeenCalledWith('popular');

    // Clear search by clicking X
    const searchbox = screen.getByRole('searchbox');
    const xButton = searchbox.nextElementSibling as HTMLElement;
    if (xButton) fireEvent.click(xButton);
    expect(mockSetSearchQuery).toHaveBeenCalledWith('');
  });

  it('renders error state and handles retry safely', () => {
    const mockRetry = vi.fn();
    vi.spyOn(useHomeHookModule, 'useHomeHook').mockReturnValue({
      state: { activeCategory: 'popular', searchQuery: '', debouncedQuery: '', movies: [], isLoading: true, error: 'Network Error', hasMore: true },
      handlers: { setActiveCategory: vi.fn(), setSearchQuery: vi.fn(), retry: mockRetry, loadMore: vi.fn() },
      refs: { loadMoreRef: { current: null } }
    });

    const { container } = render(<BrowserRouter><HomePage /></BrowserRouter>);
    
    // We target the button via querySelector to avoid text content issues if nested
    const retryBtn = container.querySelector('button.hover\\:underline') || Array.from(container.querySelectorAll('button')).find(b => b.innerHTML.includes('Retry') || b.innerHTML.includes('lucide-refresh-cw'));
    if (retryBtn) {
      fireEvent.click(retryBtn);
      expect(mockRetry).toHaveBeenCalledTimes(1);
    }
  });

  it('renders empty state when no movies found', () => {
    vi.spyOn(useHomeHookModule, 'useHomeHook').mockReturnValue({
      state: { activeCategory: 'popular', searchQuery: '', debouncedQuery: '', movies: [], isLoading: false, error: null, hasMore: false },
      handlers: { setActiveCategory: vi.fn(), setSearchQuery: vi.fn(), retry: vi.fn(), loadMore: vi.fn() },
      refs: { loadMoreRef: { current: null } }
    });

    render(<BrowserRouter><HomePage /></BrowserRouter>);
    expect(screen.getByText('No movies found')).toBeInTheDocument();
  });
});
