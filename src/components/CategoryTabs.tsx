import { Flame, TrendingUp, Award, Sparkles } from 'lucide-react';
import type { MovieCategory } from '../types/tmdb';

const CATEGORIES = [
  { id: 'now_playing', label: 'Now Playing', icon: Flame },
  { id: 'popular', label: 'Popular', icon: TrendingUp },
  { id: 'top_rated', label: 'Top Rated', icon: Award },
  { id: 'upcoming', label: 'Upcoming', icon: Sparkles }
] as const;

interface CategoryTabsProps {
  activeCategory: MovieCategory;
  onSelectCategory: (category: MovieCategory) => void;
}

export function CategoryTabs({ activeCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div role="tablist" className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-inner">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            data-testid={`category-tab-${cat.id}`}
            onClick={() => onSelectCategory(cat.id as MovieCategory)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-rose-500/25 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-400'}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
