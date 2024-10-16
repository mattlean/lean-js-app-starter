import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Counter from '.'

test('Counter component matches snapshot', () => {
    const { asFragment } = render(<Counter />)
    expect(asFragment()).toMatchSnapshot()
})

test('Counter component increments count when + button is clicked', async () => {
    expect.assertions(4)

    const user = userEvent.setup()

    render(<Counter />)

    // Expect counter to start at 0
    expect(screen.queryByText(0)).toBeInTheDocument()
    expect(screen.queryByText(1)).not.toBeInTheDocument()

    // Click the + button once
    await user.click(screen.getByRole('button', { name: /increment count/i }))

    // Expect counter to have been incremented to 1
    expect(screen.queryByText(1)).toBeInTheDocument()
    expect(screen.queryByText(0)).not.toBeInTheDocument()
})

test('Counter component decrements count when - button is clicked', async () => {
    expect.assertions(4)

    const user = userEvent.setup()

    render(<Counter />)

    // Expect counter to start at 0
    expect(screen.queryByText(0)).toBeInTheDocument()
    expect(screen.queryByText(-1)).not.toBeInTheDocument()

    // Click the - button once
    await user.click(screen.getByRole('button', { name: /decrement count/i }))

    // Expect counter to have been decremented to -1
    expect(screen.queryByText(-1)).toBeInTheDocument()
    expect(screen.queryByText(0)).not.toBeInTheDocument()
})

test('Counter component changes count to force count value when force button is clicked', async () => {
    expect.assertions(4)

    const user = userEvent.setup()

    render(<Counter />)

    // Expect counter to start at 0
    expect(screen.queryByText(0)).toBeInTheDocument()
    expect(screen.queryByText(5)).not.toBeInTheDocument()

    await user.type(screen.getByRole('spinbutton'), '5')
    await user.click(screen.getByRole('button', { name: /force!/i }))

    // Expect counter to have been forced to 5
    expect(screen.queryByText(5)).toBeInTheDocument()
    expect(screen.queryByText(0)).not.toBeInTheDocument()
})

test('Counter component disables force button when force count input is empty', async () => {
    expect.assertions(4)

    const user = userEvent.setup()

    render(<Counter />)

    // Expect force input to start empty
    const inputForceCount = screen.getByRole('spinbutton')
    expect(inputForceCount).toHaveValue(null)

    // Expect force button to start disabled
    const btnForceCount = screen.getByRole('button', { name: /force!/i })
    expect(btnForceCount).toBeDisabled()

    await user.type(inputForceCount, '5')

    // Expect force button to become enabled
    expect(btnForceCount).toBeEnabled()

    await user.clear(inputForceCount)

    // Expect force button to become disabled again
    expect(btnForceCount).toBeDisabled()
})

test('Counter component resets count when reset button is clicked', async () => {
    expect.assertions(6)

    const user = userEvent.setup()

    render(<Counter />)

    // Expect counter to start at 0
    expect(screen.queryByText(0)).toBeInTheDocument()
    expect(screen.queryByText(3)).not.toBeInTheDocument()

    // Click the + button 3x
    await user.tripleClick(
        screen.getByRole('button', { name: /increment count/i }),
    )

    // Expect counter to have been incremented to 3
    expect(screen.queryByText(3)).toBeInTheDocument()
    expect(screen.queryByText(0)).not.toBeInTheDocument()

    // Click the reset button
    await user.click(screen.getByRole('button', { name: /reset/i }))

    // Expect counter to return to 0
    expect(screen.queryByText(0)).toBeInTheDocument()
    expect(screen.queryByText(3)).not.toBeInTheDocument()
})
