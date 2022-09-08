import { render, screen } from '@testing-library/react'

import App from './App'

test('renders "Hello, World!"', () => {
  render(<App />)
  screen.debug()
  const linkElement = screen.getByText(/hello, world!/i)
  expect(linkElement).toBeInTheDocument()
})
