import { render, screen } from '@testing-library/react';
import App from './App';

test('renders template link', () => {
  render(<App />);
  const linkElement = screen.getByText(/render template/i);
  expect(linkElement).toBeInTheDocument();
});
