import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

// Mock IntersectionObserver to avoid crashes in child components
beforeAll(() => {
  class IntersectionObserverMock {
    observe() {} unobserve() {} disconnect() {}
  }
  global.IntersectionObserver = IntersectionObserverMock as any;
});

describe('App Routing & Layout', () => {
  it('renders Navbar and main layout successfully', () => {
    render(<App />);
    expect(screen.getByText('CineStream')).toBeInTheDocument();
  });
});
