import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { HomePage } from './Home.page';
import * as useHomeHookModule from './Home.hook';

describe('Page Component: HomePage', () => {
  it('renders UI elements correctly from hook state and fires handlers', () => {
    const mockSetActiveCategory = vi.fn();
    const mockSetSearchQuery = vi.fn();
    
    vi.spyOn(useHomeHookModule, 'useHomeHook').mockReturnValue({
      state: { 
        activeCategory: 'popular', 
        searchQuery: '', 
        debouncedQuery: '', 
        movies: [{ id: 1, title: 'Mocked Movie', release_date: '2024-01-01', vote_average: 5, overview: 'Desc', poster_path: null, backdrop_path: null, vote_count: 0 }], 
        isLoading: false, 
        error: null, 
        hasMore: false 
      },
      handlers: {
        setActiveCategory: mockSetActiveCategory,
        setSearchQuery: mockSetSearchQuery,
        retry: vi.fn(),
        loadMore: vi.fn()
      },
      refs: { loadMoreRef: { current: null } }
    });

    render(<BrowserRouter><HomePage /></BrowserRouter>);

    // Verify UI matches the state
    expect(screen.getByText('Mocked Movie')).toBeInTheDocument();
    
    // Verify Category Tabs interactivity
    const nowPlayingTab = screen.getByTestId('cat-now_playing');
    fireEvent.click(nowPlayingTab);
    expect(mockSetActiveCategory).toHaveBeenCalledWith('now_playing');

    // Verify SearchBar interactivity
    const searchbox = screen.getByRole('searchbox');
    fireEvent.change(searchbox, { target: { value: 'Avatar' } });
    expect(mockSetSearchQuery).toHaveBeenCalledWith('Avatar');
  });
});
