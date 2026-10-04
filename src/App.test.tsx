import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import App from './App';

// Mock IntersectionObserver to avoid crashes in child components
beforeAll(() => {
  class IntersectionObserverMock {
    observe() {} unobserve() {} disconnect() {}
  }
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    value: IntersectionObserverMock,
  });
});

describe('App Routing & Layout', () => {
  it('renders Navbar and main layout successfully', () => {
    render(<App />);
    expect(screen.getByText('CineStream')).toBeInTheDocument();
  });
});
