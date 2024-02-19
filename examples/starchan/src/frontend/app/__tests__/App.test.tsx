/**
 * @jest-environment jsdom
 */
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react'

import { TestApp, setupDefaultMsw } from '../../../common/util/test'
import { buildStore } from '../../common/redux'

setupDefaultMsw()

test('App component matches snapshot for basic render', () => {
    const store = buildStore()

    const { asFragment } = render(
        <TestApp initialEntries={['/']} store={store} />
    )

    expect(asFragment()).toMatchSnapshot()
})

test('App component matches diff snapshot transitioning from loading render to complete render', async () => {
    expect.assertions(1)

    const store = buildStore()

    const { asFragment } = render(
        <TestApp initialEntries={['/']} store={store} />
    )

    const loadingRender = asFragment()

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    const completeRender = asFragment()

    expect(loadingRender).toMatchDiffSnapshot(completeRender)
})
