import { render, screen } from '@testing-library/react';
import App from './App';

test('renders top bar search input', () => {
  render(<App />);
  expect(screen.getByRole('searchbox', { name: /search assets/i })).toBeInTheDocument();
});
