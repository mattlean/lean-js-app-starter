import helloWorld from './helloWorld'
import { clearRootEl, setupRootEl } from './jestUtil'

beforeAll(() => setupRootEl())

afterEach(() => clearRootEl())

test('helloWorld function renders "Hello World!" div element', () => {
    expect(helloWorld()).toMatchSnapshot()
})
