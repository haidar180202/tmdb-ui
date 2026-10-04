export type MovieCardState = {
  imageLoaded: boolean;
};

export type MovieCardHandlers = {
  onImageLoad: () => void;
};

export type MovieCardHookReturn = {
  state: MovieCardState;
  handlers: MovieCardHandlers;
};