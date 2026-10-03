# CineStream - TMDB Movie Web App

A modern, responsive, and performant React application built to explore movies from the TMDB API. Created as a Technical Test for a Front-End Developer position.

## Tech Stack & Architecture
- **Framework:** React 18 + Vite (TypeScript)
- **Styling:** Tailwind CSS (v4) with Dark Cinema Theme
- **Data Fetching:** Axios with Custom Hooks (`useTMDB.ts`)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library

## Feature Highlights
1. **Enterprise-Grade Architecture:** Applied strict separation of concerns using the "Feature-Sliced Component-Hook" pattern:
   - `*.page.tsx` / `*.component.tsx`: Pure dumb components that only return JSX/Tailwind. No `useState` or logic inside.
   - `*.hook.ts`: Brains of the application. Contains 100% of the states, handlers, and side-effects.
   - Private Functions (`_functionName`): Functions are highly decomposed (max 35 lines) to respect clean code standards.
2. **Infinite Scroll:** Integrated `IntersectionObserver` to trigger smooth automatic loading of paginated API data.
3. **Optimized API Calls:** 
   - Centralized `axios` interceptor passing the `Bearer Token` via HTTP headers, not URL params.
   - `useDebounce` hook guarantees no API spam when the user is typing in the search bar.
   - Used `append_to_response=credits` on the Detail API to fetch the movie profile, cast, and director in a single network request.
4. **Resilient UX:** 
   - Shimmer skeleton loaders.
   - Fallback error images using Unsplash if TMDB poster paths return `null`.
   - `navigate(-1)` on the Back button preserves list scroll state perfectly.
5. **Verified Stability (100% Code Coverage):** 
   - `vitest` unit test suite uses the modern *Colocated Test* pattern (e.g., `Home.page.test.tsx` sits next to `Home.page.tsx`).
   - Achieved **100% Statements, Lines, and Functions Coverage** across all business logic layers (`*.hook.ts` & `*.api.ts`) using Black-box public API testing. HTML/JSX logic is heavily covered via React Testing Library interaction tests.

## File Naming Conventions
- `*.api.ts`: Centralized HTTP endpoints logic.
- `*.component.tsx`: Global UI components.
- `*.page.tsx`: Route-level UI layout views.
- `*.hook.ts`: Isolated business logic and state managers.
- `*.test.tsx` / `*.test.ts`: Colocated unit tests for specific files.

## How to Run Locally

1. Create a `.env.local` in the root folder with your TMDB API v3 / v4 token:
   ```env
   VITE_TMDB_ACCESS_TOKEN=your_jwt_bearer_token_here
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start development server:
   ```bash
   pnpm dev
   ```

## Development Commands
- **Lint / Type Check:** `pnpm run lint` (uses `tsc --noEmit`)
- **Unit Tests:** `pnpm test`
- **Test Coverage:** `pnpm run coverage` (View HTML report in `/coverage/index.html`)
- **Production Build:** `pnpm run build`
