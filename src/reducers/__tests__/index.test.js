import deepFreeze from 'deep-freeze'

import { counter, addCounter, removeCounter, incrementCounter, toggleTodo, todos } from '../index'

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

// describe('Add counter reducer', () => {
//   const listBefore = []
//   const listAfter = [0]
//
//   deepFreeze(listBefore)
//
//   it('adds to counter list without mutating', () => {
//     expect(addCounter(listBefore)).toEqual(listAfter)
//   })
// })
//
// describe('Remove counter reducer', () => {
//   const listBefore = [0, 10, 20]
//   const listAfter = [0, 20]
//
//   deepFreeze(listBefore)
//
//   it('removes from counter list without mutating', () => {
//     expect(removeCounter(listBefore, 1)).toEqual(listAfter)
//   })
// })
//
// describe('Increment counter reducer', () => {
//   const listBefore = [0, 10, 20]
//   const listAfter = [0, 11, 20]
//
//   deepFreeze(listBefore)
//
//   it('increment from counter list without mutating', () => {
//     expect(incrementCounter(listBefore, 1)).toEqual(listAfter)
//   })
// })
//
// describe('Toggle todo reducer', () => {
//   const todoBefore = {
//     id: 0,
//     text: 'Learn Redux',
//     completed: false
//   }
//
//   const todoAfter = {
//     id: 0,
//     text: 'Learn Redux',
//     completed: true
//   }
//
//   deepFreeze(todoBefore)
//
//   it('toggles todo without mutating', () => {
//     expect(toggleTodo(todoBefore)).toEqual(todoAfter)
//   })
// })

describe('Todos reducer', () => {
  it('adds todo without mutating', () => {
    const stateBefore = []

    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux'
    }

    const stateAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      }
    ]

    deepFreeze(stateBefore)
    deepFreeze(action)

    expect(todos(stateBefore, action)).toEqual(stateAfter)
  })

  it('toggles todo without mutating', () => {
    const stateBefore = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go shopping',
        completed: false
      }
    ]

    const action = {
      type: 'TOGGLE_TODO',
      id: 1
    }

    const stateAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go shopping',
        completed: true
      }
    ]

    deepFreeze(stateBefore)
    deepFreeze(stateAfter)

    expect(todos(stateBefore, action)).toEqual(stateAfter)
  })
})
