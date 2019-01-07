import * as actions from '../'

describe('actions', () => {
  test('decrement() creates an action that decrements the counter', () => {
    const expectedAction = { type: 'DECREMENT' }

    expect(actions.decrement()).toEqual(expectedAction)
  })

  test('increment() creates an action that increments the counter', () => {
    const expectedAction = { type: 'INCREMENT' }

    expect(actions.increment()).toEqual(expectedAction)
  })
})
