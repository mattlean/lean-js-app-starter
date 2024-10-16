import renderer from 'react-test-renderer'

import PNGTest from '.'

test('PNGTest component matches snapshot', () => {
    const tree = renderer.create(<PNGTest />).toJSON()
    expect(tree).toMatchSnapshot()
})
