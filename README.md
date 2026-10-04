# 🎬 CineStream - TMDB Movie Web App

> A modern, responsive, and performant React application built to explore movies from the TMDB API. Specifically engineered as an advanced Technical Test submission for a Senior/Lead Front-End Developer position.

![TMDB API](https://img.shields.io/badge/TMDB-API%20v3-01b4e4?style=flat-square&logo=themoviedb)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Coverage-100%25-72A140?style=flat-square&logo=vitest)

---

## 🏗️ Tech Stack & Architecture

- **Core Framework:** React 18, Vite (Lightning-fast HMR), TypeScript (Strict Mode with `verbatimModuleSyntax`).
- **Styling:** Tailwind CSS v4 featuring a custom Dark Cinema Theme and fully responsive UI.
- **Data Fetching:** Axios with Custom Hooks (Centralized Interceptors).
- **Routing:** React Router v6.
- **Icons & Assets:** Lucide React for consistent vector iconography.
- **Testing Engine:** Vitest + React Testing Library (JSDOM environment).
- **Code Quality:** Oxlint (Rust-based ultrafast linter) + `tsc -b` + Husky Git Hooks, enforcing zero-warning pre-commit validation and strict typings.

---

## ✨ Enterprise-Grade Feature Highlights

### 1. Feature-Sliced Component-Hook Pattern (Clean Code)

The codebase strictly separates presentational UI from business logic:

- `*.page.tsx` / `*.component.tsx`: **Pure "Dumb" Components**. They only return JSX/Tailwind. Absolutely zero `useState` or `useEffect` exists inside rendering files.
- `*.hook.ts`: **The "Smart" Brains**. Contains 100% of state management, handlers, and side-effects.
- **Micro-Functions:** Private helper functions (`_useDebounce`, `_fetchData`) are rigorously decomposed to a maximum of 35 lines to adhere to Robert C. Martin's Clean Code standards.

### 2. High-Performance Data Fetching

- **Single Request Payload:** The movie detail page utilizes TMDB's `append_to_response=credits` parameter to fetch the movie profile, cast list, and director information in just _one single network round-trip_.
- **Native Infinite Scroll:** Replaced heavy scroll event listeners with native `IntersectionObserver` attached to a DOM sentinel, ensuring 60fps buttery-smooth pagination.
- **Debounced Smart Search:** A custom `useDebounce` hook guarantees no API spam when the user is typing rapidly.

### 3. Resilient UX & Edge-Case Handling

- Displays elegant **Shimmer Skeleton Loaders** before paints.
- Implements fallback logic (using Unsplash placeholders) if TMDB poster/backdrop images return `null`.
- The Back button utilizes `navigate(-1)` to preserve the user's previous list-scroll position and active filters seamlessly.
- Handles empty API datasets and network timeout errors with dedicated UI states and a "Retry" mechanism.

### 4. Verified Stability (100% Code Coverage)

- Testing follows the modern **Colocated Test Pattern** (e.g., `Home.page.test.tsx` sits directly next to `Home.page.tsx`).
- Achieved an outstanding **100% Statements, Lines, and Functions Coverage** across all business logic layers (`*.hook.ts` & `*.api.ts`) using Black-box public API assertion testing.
- UI layer logic is heavily covered via React Testing Library user interaction simulations (clicking tabs, typing in search, triggering observers).

---

## 📂 Strict File Naming Conventions

The repository relies on suffix dot-notation to make developer navigation predictable and strictly separated:

- `*.api.ts` — Centralized HTTP endpoints logic.
- `*.component.tsx` — Reusable global UI blocks.
- `*.page.tsx` — Route-level UI layout views.
- `*.hook.ts` — Isolated business logic and state managers.
- `*.type.ts` — TypeScript interfaces, types, and strict type definitions (Zero `any` policy).
- `*.config.ts` — Static data, constants, and hardcoded configurations.
- `*.test.tsx` / `*.test.ts` — Colocated unit tests for their specific sibling files.

---

## 🚀 How to Run Locally

### 1. Environment Setup

Create a `.env.local` file in the root folder using the provided template:

```bash
cp .env.example .env.local
```

Then, insert your TMDB API v3 / v4 token:

```env
VITE_TMDB_ACCESS_TOKEN=your_jwt_bearer_token_here
```

### 2. Install & Start

```bash
# Install dependencies using pnpm (preferred) or npm
pnpm install

# Start the blazing fast Vite development server
pnpm dev
```

---

## 🛡️ Development & CLI Commands

This project is guarded by strict CI-like configurations. You cannot bypass the **90% coverage threshold** without failing the test runner.

- **Check Code Quality:** `pnpm run lint` _(Runs ultra-fast `oxlint` and strict typechecking via `tsc -b`)_
- **Run Unit Tests:** `pnpm test` _(Executes the Vitest suite)_
- **Check Coverage:** `pnpm run coverage` _(Enforces the 90%+ code coverage threshold and generates an HTML report)_
- **Production Build:** `pnpm run build` _(Compiles strict TS and bundles via Vite Rollup)_
