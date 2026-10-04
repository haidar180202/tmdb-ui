import { ArrowLeft, Film, Star, Clock } from 'lucide-react';
import { useDetailHook } from './Detail.hook';
import type { MovieDetail } from '../../api/tmdb.type';

/**
 * Formats image path into full TMDB URL or returns fallback image.
 * @param {string | null} path - Partial image path from TMDB.
 * @returns {string} Full resolved image URL.
 */
function _getImageUrl(path: string | null) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` 
              : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=60';
}

/**
 * Renders the movie header information (title, stats, genres).
 * @param {MovieDetail} movie - Movie detail object.
 * @returns {JSX.Element} Movie header section.
 */
function _renderHeaderInfo(movie: MovieDetail) {
  return (
    <>
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <div className="flex gap-4 text-sm text-slate-400">
        <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500"/> {movie.vote_average.toFixed(1)}</span>
        {movie.runtime && <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {movie.runtime} min</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {movie.genres?.map(g => <span key={g.id} className="px-2 py-1 bg-slate-800 rounded-md text-xs">{g.name}</span>)}
      </div>
      <p className="text-slate-300 leading-relaxed pt-2">{movie.overview}</p>
    </>
  );
}

/**
 * Renders the director and cast credits section.
 * @param {MovieDetail} movie - Movie detail object containing credits.
 * @returns {JSX.Element} Credits section.
 */
function _renderCredits(movie: MovieDetail) {
  return (
    <>
      <div className="pt-4">
        <h3 className="font-bold text-sm text-slate-400">Director</h3>
        <p className="font-medium text-slate-100">
          {movie.credits?.crew.find(c => c.job === 'Director')?.name || 'Unknown'}
        </p>
      </div>
      
      <div className="pt-6 border-t border-slate-800">
        <h3 className="font-bold mb-3">Top Cast</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {movie.credits?.cast.slice(0, 5).map(c => (
            <div key={c.id} className="w-20 shrink-0 text-center">
              <img src={_getImageUrl(c.profile_path)} alt={c.name} className="w-16 h-16 rounded-full object-cover mx-auto bg-slate-800 mb-2" />
              <p className="text-xs font-semibold line-clamp-1">{c.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * Main Detail Page view displaying single movie information.
 * @returns {JSX.Element} The assembled Detail Page.
 */
export function DetailPage() {
  const { state, handlers } = useDetailHook();

  if (state.isLoading) return <div className="p-20 flex justify-center"><Film className="w-8 h-8 animate-spin text-amber-500" /></div>;
  if (state.error || !state.movie) return <div className="p-20 text-center text-red-400">{state.error || 'Not found'}</div>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 w-full animate-fadeIn">
      <button onClick={handlers.goBack} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4"/> Back
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={_getImageUrl(state.movie.poster_path)} alt={state.movie.title} className="w-full md:w-72 rounded-2xl shadow-xl" />
        <div className="space-y-4 w-full">
          {_renderHeaderInfo(state.movie)}
          {_renderCredits(state.movie)}
        </div>
      </div>
    </main>
  );
}
