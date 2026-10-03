import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import type { Movie } from '../types/tmdb';

const mockMovie: Movie = {
  id: 123,
  title: 'Inception',
  overview: 'Dream within a dream.',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2010-07-16',
  vote_average: 8.8,
  vote_count: 20000,
  genre_ids: [28, 878]
};

describe('MovieCard Component', () => {
  it('renders movie title, year, and rating correctly', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );

    expect(screen.getByTestId('movie-title')).toHaveTextContent('Inception');
    expect(screen.getByTestId('movie-release-year')).toHaveTextContent('2010');
    expect(screen.getByTestId('movie-rating')).toHaveTextContent('8.8');
  });
});
