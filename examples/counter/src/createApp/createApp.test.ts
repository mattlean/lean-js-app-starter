import createApp from '.'
import { clearRootEl, setupRootEl } from '../jestUtil'

beforeAll(() => setupRootEl())

afterEach(() => clearRootEl())

test('App element matches snapshot', () => {
    const rootEl = document.getElementById('root')

    if (!rootEl) {
        throw new Error('HTML element with an ID of "root" was not found.')
    }

    expect(createApp(rootEl)).toMatchSnapshot()
})
