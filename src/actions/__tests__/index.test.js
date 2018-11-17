import * as actions from '../index'

describe('actions', () => {
  test('clearErr(\'{KEY}\') creates an action that clears an error with the specific key', () => {
    const key = 'all'
    const expectedAction = {
      type: 'CLEAR_ERR',
      key
    }

    expect(actions.clearErr(key)).toEqual(expectedAction)
  })

  test('clearAllErrs() creates an action that clears all errors', () => {
    const expectedAction = {
      type: 'CLEAR_ALL_ERRS'
    }

    expect(actions.clearAllErrs()).toEqual(expectedAction)
  })

  test('endFetch() creates an action that ends fetch request', () => {
    const expectedAction = {
      type: 'FETCH_END'
    }

    expect(actions.endFetch()).toEqual(expectedAction)
  })
})
