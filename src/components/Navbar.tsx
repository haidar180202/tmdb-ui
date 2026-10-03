import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 cursor-pointer select-none group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Stream</span>
            </span>
            <span className="hidden sm:block text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
              TMDB Movies Explorer
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
