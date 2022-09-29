import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('renders "Hello, World!"', () => {
    render(<App />)

    const linkElement = screen.getByText(/hello, world!/i)
    expect(linkElement).toBeInTheDocument()
  })
})
