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
1. **Enterprise-grade Architecture:** Applied strict separation of concerns using the Component-Hook pattern (e.g., `HomePage.tsx` for pure UI and `useHomePage.ts` for state logic) following scalable front-end conventions.
2. **Infinite Scroll:** Integrated `IntersectionObserver` to trigger smooth automatic loading of paginated API data.
3. **Optimized API Calls:** 
   - Centralized `axios` interceptor passing the `Bearer Token` via HTTP headers, not URL params.
   - `useDebounce` hook guarantees no API spam when the user is typing in the search bar.
   - Used `append_to_response=credits` on the Detail API to fetch the movie profile, cast, and director in a single network request.
4. **Resilient UX:** 
   - Shimmer skeleton loaders.
   - Fallback error images using Unsplash if TMDB poster paths return `null`.
   - `navigate(-1)` on the Back button preserves list scroll state perfectly.
5. **Verified Stability:** `vitest` unit test suite maps 1:1 with source files (`__tests__/pages/HomePage.test.tsx` tests `HomePage.tsx`), asserting rendering logic, DOM state, and mocked hook dependencies perfectly.

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
- **Unit Tests:** `pnpm exec vitest run`
- **Production Build:** `pnpm run build`
