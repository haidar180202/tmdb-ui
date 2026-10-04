# Architecture & Conventions

This document outlines the core architectural decisions, design patterns, and coding conventions adopted in this TMDB React Web App. It is designed to act as a definitive blueprint for scalability, maintainability, and enterprise-grade code quality.

---

## 1. Feature-Sliced Component-Hook Pattern
To ensure the UI is decoupled from business logic, the application strictly adheres to the Component-Hook separation pattern. This prevents "Spaghetti Code" and makes testing significantly easier.

- **`.component.tsx` / `.page.tsx`**: These are purely **Dumb Components**. They must *never* contain `useState`, `useEffect`, or API calls. Their sole responsibility is calling a hook, consuming its output, and returning a JSX structure mapped with Tailwind CSS classes.
- **`.hook.ts`**: The "Smart Logic" of the application. It acts as the brain. It handles data fetching, state management, debounce timers, and intersection observers. It must return a structured object consisting of `{ state, handlers, refs }` to be consumed by the UI components.

## 2. Function Decomposition & Clean Code
Readability and maintainability are top priorities.
- **Max 35-Lines Rule:** "God functions" are strictly prohibited. Any logic or JSX return block exceeding 35 lines must be abstracted into smaller, manageable chunks.
- **Private Prefix (`_`):** Internal helper functions that shouldn't be exposed outside the module are explicitly prefixed with an underscore (e.g., `_useDebounce`, `_renderCategoryTabs`). This creates clear boundaries of what is public API vs internal implementation.

## 3. Strict Suffix Naming Conventions
Global suffix dot-notation is heavily enforced so developers can immediately identify a file's responsibility without opening it:
- `*.api.ts` -> Exclusively HTTP methods, Axios instances, and data-transfer objects (DTOs/Interfaces).
- `*.component.tsx` -> Reusable, stateless UI blocks.
- `*.page.tsx` -> Route-level view wrappers.
- `*.hook.ts` -> Isolated logic for specific pages or components.

## 4. Colocated Unit Testing (Black-Box)
- Tests are **not** centralized in a monolithic `__tests__` folder. Instead, they are *colocated* (placed immediately next to the file they are testing, e.g., `Home.hook.test.ts` lives next to `Home.hook.ts`). This ensures tests are easily discovered and deleted when components are removed.
- Tests rely on **Black-Box Testing**. We do not export private functions (like `_useDebounce`) just to test them. Instead, we test the public output (`useHomeHook`) and assert the behaviors holistically, driving the private functions to run naturally.
- The project mandates maintaining **100% Statements/Lines/Functions Coverage** for the business logic layer.

## 5. Automated Quality Gates & Thresholds
- **Coverage Threshold Enforcer:** The `vite.config.ts` has a strict gatekeeper configured. Running tests with coverage will automatically **FAIL the build pipeline** if the overall codebase coverage (Statements, Functions, Lines, or Branches) drops below **90%**.
- **Linting:** The codebase relies on `tsc --noEmit` as a lightweight, lightning-fast linter to catch semantic anomalies before runtime.

## 6. Optimized Performance Techniques
- **Single API Call for Details:** The movie detail page utilizes `append_to_response=credits` to fetch the movie profile, cast list, and director information in a single round-trip to the TMDB server, minimizing network latency.
- **Native Infinite Scroll:** Realized using `IntersectionObserver` directly on a DOM element (Sentinel), avoiding heavy `scroll` event listeners and ensuring smooth 60fps scrolling without blocking the main thread.
- **Debounced Fetching:** Search inputs are delayed via a custom hook, ensuring we don't spam the TMDB API and hit rate limits when a user types rapidly.
