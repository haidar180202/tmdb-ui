# Architecture & Conventions

This document outlines the architectural decisions, design patterns, and coding conventions adopted in this TMDB React Web App. It is designed to act as a blueprint for scalability.

## 1. Feature-Sliced Component-Hook Pattern
To ensure the UI is decoupled from business logic, the application strictly adheres to the Component-Hook separation pattern.

- **`.component.tsx` / `.page.tsx`**: These are purely **Dumb Components**. They must *never* contain `useState`, `useEffect`, or API calls. Their sole responsibility is calling a hook and returning JSX structure with Tailwind classes.
- **`.hook.ts`**: The "Smart Logic" of the application. It handles data fetching, state management, debounce timers, and intersection observers. It must return a structured object consisting of `{ state, handlers, refs }` to be consumed by the UI components.

## 2. Function Decomposition & Clean Code
- **Max 35-Lines Rule:** God functions are strictly prohibited. Any logic exceeding 35 lines must be abstracted into smaller, manageable chunks.
- **Private Prefix:** Internal helper functions that shouldn't be exposed outside the module are prefixed with an underscore (e.g., `_useDebounce`, `_useFetchMovies`).

## 3. Strict Naming Conventions
Global suffix dot-notation is heavily enforced so developers can immediately identify a file's responsibility without opening it:
- `tmdb.api.ts` -> Exclusively HTTP methods and Axios instances.
- `MovieCard.component.tsx` -> Reusable UI block.
- `Home.page.tsx` -> Route-level view wrapper.
- `Home.hook.ts` -> Isolated logic for the Home page.

## 4. Colocated Unit Testing (Black-Box)
- Tests are **not** centralized in a `__tests__` folder. Instead, they are *colocated* (placed next to the file they are testing, e.g., `Home.hook.test.ts` lives next to `Home.hook.ts`).
- Tests rely on **Black-Box Testing**. We do not export private functions (`_useDebounce`) just to test them. Instead, we test the public output (`useHomeHook`) and assert the behaviors holistically, driving the private functions to run naturally.
- Current coverage sits at **100% Statements/Lines/Functions** for the logic layer.

## 5. Optimized Performance
- **Single API Call for Details:** The movie detail page utilizes `append_to_response=credits` to fetch the movie profile, cast list, and director information in a single round-trip to the TMDB server.
- **Infinite Scroll:** Realized using `IntersectionObserver` directly on a DOM element (Sentinel), avoiding heavy `scroll` event listeners and ensuring smooth 60fps scrolling.
