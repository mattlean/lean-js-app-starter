// @flow
import React from 'react'

const Counter = (
  { onDecrement, onIncrement, value }: {onDecrement: () => void, onIncrement: () => void, value: number}
) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

export default Counter
