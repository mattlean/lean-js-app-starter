/**
 * @jest-environment jsdom
 */
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'

import { buildStore } from '../common/redux'
import { TestApp } from '../common/util/test'
import { server } from '../mocks/node'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('App component matches the snapshot', async () => {
    const store = buildStore()

    const { asFragment } = render(
        // <div>hello</div>
        <TestApp initialEntries={['/ping']} store={store} />
    )

    console.log('first form', asFragment())
    screen.debug()

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    // await screen.findByText(/eyyo/i)

    console.log('second form yey', asFragment())
    screen.debug()

    // expect(screen.getByTestId('loading')).toHaveTextContent('Loading...')

    expect(asFragment()).toMatchSnapshot()
})
