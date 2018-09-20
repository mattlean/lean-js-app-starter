import counter from '../counter'

describe('Counter reducer', () => {
  it('increments 0 to 1 when receiving INCREMENT action', () => {
    expect(counter(0, { type: 'INCREMENT' })).toEqual(1)
  })

  it('increments 1 to 2 when receiving INCREMENT action', () => {
    expect(counter(1, { type: 'INCREMENT' })).toEqual(2)
  })

  it('decrements 2 to 1 when receiving DECREMENT action', () => {
    expect(counter(2, { type: 'DECREMENT' })).toEqual(1)
  })

  it('decrements 1 to 0 when receiving DECREMENT action', () => {
    expect(counter(1, { type: 'DECREMENT' })).toEqual(0)
  })

  it('receive state (which is 1) when receiving unsupported action', () => {
    expect(counter(1, { type: 'SOMETHING_ELSE' })).toEqual(1)
  })

  it('specifies initial state', () => {
    expect(counter(undefined, {})).toEqual(0)
  })
})
