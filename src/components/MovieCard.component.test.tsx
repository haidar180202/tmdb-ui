import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { MovieCard } from './MovieCard.component';

describe('Component: MovieCard', () => {
  const mockMovie = { 
    id: 999, 
    title: 'The Matrix', 
    release_date: '1999-03-31', 
    vote_average: 8.7, 
    overview: 'Welcome to the Real World.', 
    poster_path: '/matrix.jpg', 
    backdrop_path: '/matrix_bg.jpg', 
    vote_count: 30000 
  };

  it('renders correct movie information to the UI', () => {
    render(<BrowserRouter><MovieCard movie={mockMovie} /></BrowserRouter>);
    expect(screen.getByTestId('movie-title')).toHaveTextContent('The Matrix');
    expect(screen.getByTestId('movie-rating')).toHaveTextContent('8.7');
    expect(screen.getByTestId('movie-release-year')).toHaveTextContent('1999');
  });

  it('navigates to the correct detail page link', () => {
    render(<BrowserRouter><MovieCard movie={mockMovie} /></BrowserRouter>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/999');
  });
});
