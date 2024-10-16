import renderer from 'react-test-renderer'

import App from '.'

test('App component matches snapshot', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
})
