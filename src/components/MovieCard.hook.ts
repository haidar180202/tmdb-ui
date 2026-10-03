import { useState } from 'react';

export function useMovieCardHook() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return {
    state: { imageLoaded },
    handlers: {
      onImageLoad: () => setImageLoaded(true)
    }
  };
}
