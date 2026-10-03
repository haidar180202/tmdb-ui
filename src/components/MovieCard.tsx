import { useState } from 'react';
import { Film, Star, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/tmdb';
import { getPosterUrl } from '../utils/tmdbImage';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';
  const posterSrc = getPosterUrl(movie.poster_path);

  return (
    <Link
      to={`/movie/${movie.id}`}
      data-testid="movie-card"
      className="group relative bg-slate-900/70 rounded-2xl border border-slate-800/80 hover:border-amber-500/50 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      <div className="relative aspect-[2/3] w-full bg-slate-800 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
            <Film className="w-10 h-10 text-slate-700 animate-spin" />
          </div>
        )}
        <img
          src={posterSrc}
          alt={movie.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-slate-100" data-testid="movie-rating">{rating}</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
            View Details <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between bg-gradient-to-b from-slate-900 to-slate-950">
        <div>
          <h3 
            data-testid="movie-title" 
            className="font-bold text-slate-100 text-base leading-snug line-clamp-1 group-hover:text-amber-400 transition-colors"
            title={movie.title}
          >
            {movie.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
            <span className="flex items-center gap-1" data-testid="movie-release-year">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {releaseYear}
            </span>
            {movie.vote_count > 0 && (
              <span className="text-slate-500">
                ({movie.vote_count.toLocaleString()} votes)
              </span>
            )}
          </div>
        </div>
        <p className="mt-2.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {movie.overview || 'No description available for this title.'}
        </p>
      </div>
    </Link>
  );
}
