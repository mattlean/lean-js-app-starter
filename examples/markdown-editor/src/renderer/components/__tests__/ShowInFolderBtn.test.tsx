import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MOCK_FOOBAR_FILE_PATH } from '../../../common/MOCK_DATA'
import ShowInFolderBtn from '../ShowInFolderBtn'

beforeEach(() => {
    // Mock the API
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.api = {
        showInFolder: jest.fn(),
    }
})

/**
 * Setup user-event and render the component.
 */
const setupTest = (filePath?: string) => {
    const user = userEvent.setup()
    const { asFragment } = render(<ShowInFolderBtn filePath={filePath} />)

    return { asFragment, user }
}

test('ShowInFolderBtn component matches snapshot', () => {
    const { asFragment } = setupTest()
    expect(asFragment()).toMatchSnapshot()
})

test('ShowInFolderBtn component does not open a folder when clicked while disabled', async () => {
    // Render without filePath prop to simulate that file is not opened
    const { user } = setupTest()

    // Expect showInFolder to start with 0 calls
    expect(
        (
            window.api.showInFolder as jest.MockedFunction<
                typeof window.api.showInFolder
            >
        ).mock.calls,
    ).toHaveLength(0)

    await user.click(screen.getByRole('button'))

    // Expect showInFolder to remain with 0 calls as the click should have been on a disabled button
    expect(
        (
            window.api.showInFolder as jest.MockedFunction<
                typeof window.api.showInFolder
            >
        ).mock.calls,
    ).toHaveLength(0)
})

test('ShowInFolderBtn component opens the folder the currently opened file is located in when clicked while enabled', async () => {
    // Render with filePath prop to simulate that file is opened
    const { user } = setupTest(MOCK_FOOBAR_FILE_PATH)

    // Expect showInFolder to start with 0 calls
    expect(
        (
            window.api.showInFolder as jest.MockedFunction<
                typeof window.api.showInFolder
            >
        ).mock.calls,
    ).toHaveLength(0)

    await user.click(screen.getByRole('button'))

    // Expect showInFolder to now have 1 call
    expect(
        (
            window.api.showInFolder as jest.MockedFunction<
                typeof window.api.showInFolder
            >
        ).mock.calls,
    ).toHaveLength(1)
})
