import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Film, Clock, Calendar, Star, AlertCircle, User, Info } from 'lucide-react';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { getPosterUrl, getBackdropUrl } from '../utils/tmdbImage';
import { Navbar } from '../components/Navbar';

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = id ? parseInt(id, 10) : null;

  const { movie, isLoading, error } = useMovieDetail(movieId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 space-y-4">
        <Film className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-slate-300 font-medium">Loading film profile & credits...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full p-8 bg-rose-950/30 border border-rose-800/50 rounded-2xl text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <h3 className="text-xl font-bold text-rose-200">Unable to load movie details</h3>
          <p className="text-slate-400 text-sm">{error || 'Movie could not be found.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-colors mt-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Movie List
          </button>
        </div>
      </div>
    );
  }

  const backdropSrc = getBackdropUrl(movie.backdrop_path);
  const posterSrc = getPosterUrl(movie.poster_path);
  
  const director = movie.credits?.crew?.find((c) => c.job === 'Director')?.name || 'Unknown Director';
  const topCast = (movie.credits?.cast || []).slice(0, 8);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fadeIn">
        {/* Top Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            data-testid="back-button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-sm font-medium transition-all shadow-md cursor-pointer border border-slate-700/60"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Movie List
          </button>
          <span className="text-xs text-slate-400 font-mono">TMDB ID: #{movie.id}</span>
        </div>

        {/* Hero Backdrop Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl min-h-[380px] md:min-h-[460px] flex items-end">
          <img
            src={backdropSrc}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-35 filter brightness-75 scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />

          {/* Hero Content Overlay */}
          <div className="relative z-10 p-6 md:p-10 w-full flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
            {/* Poster */}
            <div className="w-36 md:w-56 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-black/80 bg-slate-900">
              <img src={posterSrc} alt={movie.title} className="w-full h-auto object-cover" />
            </div>

            {/* Quick Details */}
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                {(movie.genres || []).map((genre) => (
                  <span
                    key={genre.id}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  >
                    {genre.name}
                  </span>
                ))}
                {movie.runtime ? (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                    <Clock className="w-3 h-3 text-slate-400" /> {movie.runtime} mins
                  </span>
                ) : null}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  {movie.release_date || 'Release Date Unknown'}
                </span>
                <span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full font-bold border border-amber-500/20">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {rating} / 10
                </span>
                {movie.vote_count > 0 && (
                  <span className="text-slate-400 text-xs">
                    ({movie.vote_count.toLocaleString()} user reviews)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Details Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column: Synopsis and Cast */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Film className="w-5 h-5 text-amber-400" /> Synopsis
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                {movie.overview || 'Detailed synopsis has not been filed yet for this movie entry.'}
              </p>
            </section>

            <section className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-rose-400" /> Main Cast
              </h2>
              {topCast.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {topCast.map((actor) => (
                    <div key={actor.id} className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-center flex flex-col items-center hover:border-slate-700 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden mb-2 shadow-inner">
                        {actor.profile_path ? (
                          <img src={getPosterUrl(actor.profile_path)} alt={actor.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-slate-500" />
                        )}
                      </div>
                      <span className="font-semibold text-slate-200 text-xs line-clamp-1" title={actor.name}>{actor.name}</span>
                      <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5" title={actor.character}>{actor.character || 'Cast'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">Cast list currently unavailable.</p>
              )}
            </section>
          </div>

          {/* Right Column: Crew & Metadata */}
          <div className="space-y-6">
            <section className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" /> Production & Info
              </h3>

              <div>
                <span className="text-xs uppercase text-slate-400 font-bold block mb-1">Director</span>
                <p className="text-slate-100 font-medium text-base">{director}</p>
              </div>

              {movie.status && (
                <div>
                  <span className="text-xs uppercase text-slate-400 font-bold block mb-1">Status</span>
                  <p className="text-slate-200 font-medium text-sm">{movie.status}</p>
                </div>
              )}

              {movie.tagline && (
                <div>
                  <span className="text-xs uppercase text-slate-400 font-bold block mb-1">Tagline</span>
                  <p className="text-amber-300 italic text-sm">"{movie.tagline}"</p>
                </div>
              )}

              {movie.budget > 0 && (
                <div>
                  <span className="text-xs uppercase text-slate-400 font-bold block mb-1">Budget</span>
                  <p className="text-slate-200 font-mono text-sm">${movie.budget.toLocaleString()}</p>
                </div>
              )}

              {movie.revenue > 0 && (
                <div>
                  <span className="text-xs uppercase text-slate-400 font-bold block mb-1">Box Office</span>
                  <p className="text-emerald-400 font-mono text-sm">${movie.revenue.toLocaleString()}</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
