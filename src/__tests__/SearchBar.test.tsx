import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../components/SearchBar';
import { vi } from 'vitest';

describe('SearchBar Component', () => {
  it('calls onSearchChange when user types', () => {
    const handleSearch = vi.fn();
    render(<SearchBar searchQuery="" onSearchChange={handleSearch} onClearSearch={vi.fn()} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Interstellar' } });
    
    expect(handleSearch).toHaveBeenCalledWith('Interstellar');
  });

  it('shows clear button only when there is a search query', () => {
    const handleClear = vi.fn();
    const { rerender } = render(<SearchBar searchQuery="" onSearchChange={vi.fn()} onClearSearch={handleClear} />);
    
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();

    rerender(<SearchBar searchQuery="Dune" onSearchChange={vi.fn()} onClearSearch={handleClear} />);
    
    const clearButton = screen.getByLabelText('Clear search');
    expect(clearButton).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
