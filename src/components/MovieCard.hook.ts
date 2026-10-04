import { useState } from 'react';
import type { MovieCardHookReturn } from './MovieCard.type';

/**
 * Manages local UI state for the MovieCard component.
 * @returns {MovieCardHookReturn} Component state and handlers.
 */
export function useMovieCardHook(): MovieCardHookReturn {
  const [imageLoaded, setImageLoaded] = useState(false);

  return {
    state: { imageLoaded },
    handlers: {
      onImageLoad: () => setImageLoaded(true)
    }
  };
}
