import { Film, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../api/tmdb.type';
import { useMovieCardHook } from './MovieCard.hook';

function _getImageUrl(path: string | null) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` 
              : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=60';
}

export function MovieSkeleton() {
  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden animate-pulse flex flex-col">
      <div className="aspect-[2/3] bg-slate-800/70" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-800 rounded w-3/4" /><div className="h-3 bg-slate-800 rounded w-1/3" />
      </div>
    </div>
  );
}

export function MovieCard({ movie }: { movie: Movie }) {
  const { state, handlers } = useMovieCardHook();
  
  return (
    <Link to={`/movie/${movie.id}`} data-testid="movie-card" className="group relative bg-slate-900/70 rounded-2xl border border-slate-800/80 hover:border-amber-500/50 overflow-hidden shadow-lg transition-all flex flex-col">
      <div className="relative aspect-[2/3] w-full bg-slate-800 overflow-hidden">
        {!state.imageLoaded && <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center"><Film className="w-10 h-10 text-slate-700 animate-spin" /></div>}
        <img src={_getImageUrl(movie.poster_path)} alt={movie.title} onLoad={handlers.onImageLoad} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${state.imageLoaded ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span className="text-xs font-bold text-slate-100" data-testid="movie-rating">{movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}</span></div>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between bg-slate-900">
        <div>
          <h3 data-testid="movie-title" className="font-bold text-slate-100 text-base line-clamp-1">{movie.title}</h3>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400"><span data-testid="movie-release-year"><Calendar className="w-3.5 h-3.5 inline mr-1" />{movie.release_date?.split('-')[0] || 'N/A'}</span></div>
        </div>
      </div>
    </Link>
  );
}
