import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryTabs } from '../components/CategoryTabs';
import { vi } from 'vitest';

describe('CategoryTabs Component', () => {
  it('highlights the active tab and calls onSelectCategory on click', () => {
    const handleSelect = vi.fn();
    render(<CategoryTabs activeCategory="popular" onSelectCategory={handleSelect} />);

    const popularTab = screen.getByTestId('category-tab-popular');
    expect(popularTab).toHaveAttribute('aria-selected', 'true');

    const topRatedTab = screen.getByTestId('category-tab-top_rated');
    expect(topRatedTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(topRatedTab);
    expect(handleSelect).toHaveBeenCalledWith('top_rated');
  });
});
