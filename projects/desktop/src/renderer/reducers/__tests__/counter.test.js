import reducer, { defaultState } from '../counter'
import * as actions from '../../actions'

describe('counter reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {})

    expect(state).toEqual(defaultState)
  })

  it('should handle INCREMENT', () => {
    const state = reducer(defaultState, actions.increment())

    expect(state).toEqual(1)
  })

  it('should handle DECREMENT', () => {
    const state = reducer(defaultState, actions.decrement())

    expect(state).toEqual(-1)
  })
})
