import { useState } from 'react';

/**
 * Manages local UI state for the MovieCard component.
 * @returns {Object} Structured object containing state and image load handler.
 */
export function useMovieCardHook() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return {
    state: { imageLoaded },
    handlers: {
      onImageLoad: () => setImageLoaded(true)
    }
  };
}
