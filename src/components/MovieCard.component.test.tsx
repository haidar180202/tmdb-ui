import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { MovieCard, MovieSkeleton } from './MovieCard.component';
import * as useMovieCardHookModule from './MovieCard.hook';
import { vi } from 'vitest';

describe('Component: MovieCard', () => {
  const mockMovie = { 
    id: 999, title: 'The Matrix', release_date: '1999-03-31', 
    vote_average: 8.7, overview: 'Desc', poster_path: '/matrix.jpg', 
    backdrop_path: '/backdrop.jpg', vote_count: 30000 
  };

  it('renders correct movie information to the UI', () => {
    render(<BrowserRouter><MovieCard movie={mockMovie} /></BrowserRouter>);
    expect(screen.getByTestId('movie-title')).toHaveTextContent('The Matrix');
    expect(screen.getByTestId('movie-rating')).toHaveTextContent('8.7');
    expect(screen.getByTestId('movie-release-year')).toHaveTextContent('1999');
  });

  it('handles missing data gracefully (fallback rating & year)', () => {
    const emptyMovie = { ...mockMovie, vote_average: 0, release_date: '', poster_path: null };
    render(<BrowserRouter><MovieCard movie={emptyMovie} /></BrowserRouter>);
    expect(screen.getByTestId('movie-rating')).toHaveTextContent('NR');
    expect(screen.getByTestId('movie-release-year')).toHaveTextContent('N/A');
    const img = screen.getByAltText('The Matrix');
    expect(img).toHaveAttribute('src', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=60');
  });

  it('renders MovieSkeleton correctly', () => {
    const { container } = render(<MovieSkeleton />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('triggers opacity-100 when image is loaded', () => {
    vi.spyOn(useMovieCardHookModule, 'useMovieCardHook').mockReturnValue({
      state: { imageLoaded: true },
      handlers: { onImageLoad: vi.fn() }
    });
    render(<BrowserRouter><MovieCard movie={mockMovie} /></BrowserRouter>);
    const img = screen.getByAltText('The Matrix');
    expect(img.className).toContain('opacity-100');
  });
});
