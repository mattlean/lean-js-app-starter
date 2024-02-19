/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'

import { buildStore } from '../../../common/redux'
import { TestApp } from '../../../common/util/test'

beforeAll(() => {
    // Suppress console.error for this test as the Fail component is supposed to
    // always throw an error
    console.error = jest.fn()
})

test('ErrorHandler falls back to ErrorPage when error is caught', () => {
    // Normally with SSR testing, the backend will trigger the /fail endpoint first.
    // To avoid this so we can test the ErrorHandler, we avoid SSR and only use the
    // jsdom environment so we can encounter React Router's /fail route and execute
    // the ErrorHandler fallback code.
    const store = buildStore()

    render(<TestApp initialEntries={['/fail']} store={store} />)

    expect(screen.queryByText(/oops!/i)).toBeInTheDocument()
    expect(
        screen.queryByText(/sorry, an unexpected error has occurred./i)
    ).toBeInTheDocument()
    expect(screen.queryByText(/return to the home page./i)).toBeInTheDocument()
})
