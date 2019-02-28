import reducer, { defaultState } from '../err'
import { clearAllErrs, clearErr, setErr } from '../../actions'

describe('err reducer', () => {
  const key = 'create'
  const err = new Error('Boom!')
  let errState

  it('should return the initial state', () => {
    const state = reducer(undefined, {})

    expect(state).toEqual(defaultState)
  })

  it('should handle CLEAR_ALL_ERRS', () => {
    const action = clearAllErrs()
    const state = reducer(defaultState, action)

    expect(state).toEqual(defaultState)
  })

  it('should handle SET_ERR', () => {
    const action = setErr(key, err)
    const state = reducer(defaultState, action)
    errState = state

    expect(state).toEqual({ [key]: err })
  })

  it('should handle CLEAR_ERR', () => {
    const action = clearErr(key)
    const state = reducer(errState, action)

    expect(state).toEqual(defaultState)
  })
})
