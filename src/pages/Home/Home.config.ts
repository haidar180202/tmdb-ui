import { Flame, TrendingUp, Award, Sparkles } from 'lucide-react';
import type { CategoryItem } from './Home.type';

export const CATEGORIES: CategoryItem[] = [
  { id: 'now_playing', label: 'Now Playing', icon: Flame },
  { id: 'popular', label: 'Popular', icon: TrendingUp },
  { id: 'top_rated', label: 'Top Rated', icon: Award },
  { id: 'upcoming', label: 'Upcoming', icon: Sparkles }
];
