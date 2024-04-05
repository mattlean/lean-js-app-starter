import { getByText, render, screen, waitFor } from '@testing-library/react'
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

    return { user, asFragment }
}

test('App component matches snapshot', () => {
    const { asFragment } = setupTest()
    expect(asFragment()).toMatchSnapshot()
})

test('Markdown in editor generates HTML in preview', async () => {
    expect.assertions(2)

    const { user } = setupTest()

    // Type markdown in the editor
    await screen.findByRole('textbox')
    await user.keyboard('# Hello World{Enter}Foobar!')

    const preview = screen.getByRole('article')

    // Expect the correct HTML to be generated in the preview
    await waitFor(() => {
        expect(
            screen.getByRole('heading', { name: /hello world/i }),
        ).toBeInTheDocument()
    })
    expect(getByText(preview, /foobar!/i)).toBeInTheDocument()
})

test('Top bar hides when focus mode button is clicked', async () => {
    expect.assertions(2)

    const { user } = setupTest()

    // Expect top bar to be visible
    expect(
        screen.getByRole('button', { name: 'Open File' }),
    ).toBeInTheDocument()

    // Click the focus mode button
    await user.click(screen.getByRole('button', { name: 'Focus Mode' }))

    // Expect top bar to be hidden
    expect(
        screen.queryByRole('button', { name: 'Open File' }),
    ).not.toBeInTheDocument()
})
