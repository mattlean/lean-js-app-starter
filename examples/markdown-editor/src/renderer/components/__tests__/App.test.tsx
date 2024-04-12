import { queryByText, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

beforeEach(() => {
    // Mock the API
    window.api = {
        checkForMdChange: jest.fn(
            // Markdown changes will always be boolean
            () => new Promise((resolve) => resolve(true)),
        ),
        checkForUnsavedChanges: jest.fn(),
        /* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-empty-function */
        // @ts-ignore
        onColorModeMenu: jest.fn(() => () => {}),
        // @ts-ignore
        onFocusModeToggle: jest.fn(() => () => {}),
        // @ts-ignore
        onMainErrorMessage: jest.fn(() => () => {}),
        // @ts-ignore
        onMainHtmlExportDialog: jest.fn(() => () => {}),
        // @ts-ignore
        onMainMarkdownOpenDialog: jest.fn(() => () => {}),
        // @ts-ignore
        onMainSaveFile: jest.fn(() => () => {}),
        // @ts-ignore
        onOpenFileSuccess: jest.fn(() => () => {}),
        // @ts-ignore
        onSaveFileSuccess: jest.fn(() => () => {}),
        /* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-empty-function */
        saveFile: jest.fn(),
        showFileOpenDialog: jest.fn(),
        showHtmlExportDialog: jest.fn(),
        showInFolder: jest.fn(),
        showUnsavedChangesDialog: jest.fn(),
        syncColorModeMenu: jest.fn(),
    }

    // Allow onbeforeunload to be redefined so Jest doesn't throw errors
    Object.defineProperty(window, 'onbeforeunload', { writable: true })
})

/**
 * Setup user-event and render the component.
 */
const setupTest = () => {
    const user = userEvent.setup()
    const { asFragment } = render(<App />)

    return { asFragment, user }
}

test('App component matches snapshot', () => {
    const { asFragment } = setupTest()
    expect(asFragment()).toMatchSnapshot()
})

test('markdown in editor generates HTML in preview', async () => {
    expect.assertions(2)

    const { user } = setupTest()

    const preview = screen.getByRole('article')

    // Type markdown in the editor
    await user.keyboard('# Hello World{Enter}Foobar!')

    // Expect the correct HTML to be generated in the preview
    await waitFor(() => {
        expect(
            screen.queryByRole('heading', { name: /hello world/i }),
        ).toBeInTheDocument()
    })
    expect(queryByText(preview, /foobar!/i)).toBeInTheDocument()
})

test('top bar hides when focus mode button is clicked', async () => {
    expect.assertions(2)

    const { user } = setupTest()

    // Expect top bar to be visible
    expect(screen.queryByRole('navigation')).toBeInTheDocument()

    // Click the focus mode button
    await user.click(screen.getByRole('button', { name: /focus mode/i }))

    // Expect top bar to be hidden
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
})
