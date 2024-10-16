import renderer from 'react-test-renderer'

import SVGTest from '.'

test('SVGTest component matches snapshot', () => {
    const tree = renderer.create(<SVGTest />).toJSON()
    expect(tree).toMatchSnapshot()
})
