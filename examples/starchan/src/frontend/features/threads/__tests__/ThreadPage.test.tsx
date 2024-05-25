/**
 * @jest-environment jsdom
 */
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { act } from 'react-dom/test-utils'

import {
    MOCK_REPLY,
    MOCK_THREAD_INCLUDES_REPLY,
} from '../../../../common/MOCK_DATA'
import { TestApp } from '../../../../common/TestApp'
import { setupDefaultMsw } from '../../../../common/msw'
import { buildStore } from '../../../common/redux'

const server = setupDefaultMsw()

const user = userEvent.setup()

// The reply active feature is only a client-sided feature as URL fragment identifiers
// are not sent to the server. Therefore the test does not require SSR and only
// uses the jsdom environment.

test('thread page replies are all inactive when no fragment identifier is present', async () => {
    server.use(
        http.get('http://localhost:3000/api/v1/threads/:threadId', () =>
            HttpResponse.json({
                data: MOCK_THREAD_INCLUDES_REPLY,
            }),
        ),
    )

    expect.assertions(1)

    const store = buildStore()

    render(
        <TestApp
            initialEntries={[`/thread/${MOCK_THREAD_INCLUDES_REPLY.id}`]}
            store={store}
        />,
    )

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    const reply = document.getElementById(MOCK_REPLY.id)

    if (!reply) {
        throw new Error(
            `HTML element with an ID of "${MOCK_REPLY.id}" was not found.`,
        )
    }

    const replyContent = reply.querySelector('.reply__content')

    if (!replyContent) {
        throw new Error(`Reply content for #${MOCK_REPLY.id} was not found.`)
    }

    // Expect reply to be inactive
    expect(replyContent.classList.contains('reply__content--active')).toBe(
        false,
    )
})

test('thread page reply is active its fragment identifier is present', async () => {
    server.use(
        http.get('http://localhost:3000/api/v1/threads/:threadId', () =>
            HttpResponse.json({
                data: MOCK_THREAD_INCLUDES_REPLY,
            }),
        ),
    )

    window.HTMLElement.prototype.scrollIntoView = jest.fn() // Mock scrollIntoView since jsdom does not implement it

    expect.assertions(2)

    const store = buildStore()

    render(
        <TestApp
            initialEntries={[`/thread/${MOCK_THREAD_INCLUDES_REPLY.id}`]}
            store={store}
        />,
    )

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    const reply = document.getElementById(MOCK_REPLY.id)

    if (!reply) {
        throw new Error(
            `HTML element with an ID of "${MOCK_REPLY.id}" was not found.`,
        )
    }

    const replyContent = reply.querySelector('.reply__content')

    if (!replyContent) {
        throw new Error(`Reply content for #${MOCK_REPLY.id} was not found.`)
    }

    // Expect reply to be inactive at first
    expect(replyContent.classList.contains('reply__content--active')).toBe(
        false,
    )

    // act is needed here so useEffect runs and calls setState to make reply
    // have active styling
    await act(async () => {
        await user.click(
            screen.getByRole('link', { name: `Id.${MOCK_REPLY.id}` }),
        )
    })

    // Expect reply to be active
    expect(replyContent.classList.contains('reply__content--active')).toBe(true)
})
