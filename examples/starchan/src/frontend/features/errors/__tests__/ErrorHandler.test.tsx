/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'

import { buildStore } from '../../../common/redux'
import { TestApp, setupDefaultMsw } from '../../../common/util/test'

setupDefaultMsw()

beforeAll(() => {
    // Suppress console.error for this test as the Fail component is supposed to
    // always throw an error
    console.error = jest.fn()
})

test('ErrorHandler falls back to ErrorPage when error is caught', () => {
    const store = buildStore()

    render(<TestApp initialEntries={['/fail']} store={store} />)

    expect(screen.queryByText(/oops!/i)).toBeInTheDocument()
    expect(
        screen.queryByText(/sorry, an unexpected error has occurred./i)
    ).toBeInTheDocument()
    expect(screen.queryByText(/return to the home page./i)).toBeInTheDocument()
})
