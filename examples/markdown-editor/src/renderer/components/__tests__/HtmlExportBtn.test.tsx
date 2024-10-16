import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useReducer, useRef } from 'react'

import { INITIAL_STATE, errorMessageReducer } from '../../errorMessageReducer'
import HtmlExportBtn from '../HtmlExportBtn'

function TestComponent() {
    const [, errorMessageDispatch] = useReducer(
        errorMessageReducer,
        INITIAL_STATE,
    )

    const refPreview = useRef<HTMLElement>(null)

    return (
        <>
            <HtmlExportBtn
                refPreview={refPreview}
                errorMessageDispatch={errorMessageDispatch}
            />
            <article ref={refPreview} />
        </>
    )
}

beforeEach(() => {
    // Mock the API
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.api = {
        showHtmlExportDialog: jest.fn(),
    }
})

/**
 * Setup user-event and render the component.
 */
const setupTest = () => {
    const user = userEvent.setup()
    const { asFragment } = render(<TestComponent />)

    return { asFragment, user }
}

test('HtmlExportBtn component matches snapshot', () => {
    const { asFragment } = setupTest()
    expect(asFragment()).toMatchSnapshot()
})

test('HtmlExportBtn component initiates html export process when clicked', async () => {
    const { user } = setupTest()

    expect(
        (
            window.api.showHtmlExportDialog as jest.MockedFunction<
                typeof window.api.showHtmlExportDialog
            >
        ).mock.calls,
    ).toHaveLength(0)

    await user.click(screen.getByRole('button'))

    expect(
        (
            window.api.showHtmlExportDialog as jest.MockedFunction<
                typeof window.api.showHtmlExportDialog
            >
        ).mock.calls,
    ).toHaveLength(1)
})
