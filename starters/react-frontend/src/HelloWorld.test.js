import HelloWorld from './HelloWorld'
import renderer from 'react-test-renderer'

test('HelloWorld component matches snapshot', () => {
    const tree = renderer.create(<HelloWorld />).toJSON()
    expect(tree).toMatchSnapshot()
})
