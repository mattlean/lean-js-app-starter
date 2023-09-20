import renderer from 'react-test-renderer'

import Counter from '.'

test('Counter component matches snapshot', () => {
    const tree = renderer.create(<Counter />).toJSON()
    expect(tree).toMatchSnapshot()
})
