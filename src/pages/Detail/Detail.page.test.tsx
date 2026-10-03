import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DetailPage } from './Detail.page';
import * as useDetailHookModule from './Detail.hook';

describe('Page Component: DetailPage', () => {
  it('renders loading state correctly', () => {
    vi.spyOn(useDetailHookModule, 'useDetailHook').mockReturnValue({
      state: { movie: null, isLoading: true, error: null },
      handlers: { goBack: vi.fn() }
    });

    const { container } = render(<DetailPage />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    vi.spyOn(useDetailHookModule, 'useDetailHook').mockReturnValue({
      state: { movie: null, isLoading: false, error: 'Movie not found' },
      handlers: { goBack: vi.fn() }
    });

    render(<DetailPage />);
    expect(screen.getByText('Movie not found')).toBeInTheDocument();
  });

  it('handles missing/empty movie data gracefully (fallback logic)', () => {
    vi.spyOn(useDetailHookModule, 'useDetailHook').mockReturnValue({
      state: {
        movie: {
          id: 124, title: 'Empty Movie', overview: 'Empty', poster_path: null, backdrop_path: null,
          release_date: '', vote_average: 0, vote_count: 0,
          genres: [], runtime: null, status: '', tagline: '', budget: 0, revenue: 0,
          credits: { cast: [{ id: 2, name: 'No Image Actor', character: '', profile_path: null }], crew: [] }
        }, isLoading: false, error: null
      },
      handlers: { goBack: vi.fn() }
    });
    render(<DetailPage />);
    expect(screen.getByText('Empty Movie')).toBeInTheDocument();
    
    // Checks that fallback image logic works without throwing error
    const img = screen.getByAltText('Empty Movie');
    expect(img).toHaveAttribute('src', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=60');
    
    // Genres empty map fallback
    expect(screen.queryByText('Sci-Fi')).not.toBeInTheDocument();
  });
});
