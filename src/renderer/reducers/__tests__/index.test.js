import { getVisibleTodos } from '../index'

const state = {
  byId: {
    '24236ed7-e956-4cad-90e9-65469c554fc0': {
      id: '24236ed7-e956-4cad-90e9-65469c554fc0',
      text: 'hey',
      completed: true
    },
    '3df29b26-8f55-4722-abbd-428a3b3d3306': {
      id: '3df29b26-8f55-4722-abbd-428a3b3d3306',
      text: 'ho',
      completed: true
    },
    'afe441fd-b058-4eef-be6c-867f9956eba3': {
      id: 'afe441fd-b058-4eef-be6c-867f9956eba3',
      text: 'let us go',
      completed: false
    }
  },
  listByFilter: {
    all: {
      ids: [
        '24236ed7-e956-4cad-90e9-65469c554fc0',
        '3df29b26-8f55-4722-abbd-428a3b3d3306',
        'afe441fd-b058-4eef-be6c-867f9956eba3'
      ]
    }
  }
}

describe('root selector', () => {
  test('getVisibleTodos() should return visible todos', () => {
    expect(getVisibleTodos(state, 'all')).toEqual([
      {
        id: '24236ed7-e956-4cad-90e9-65469c554fc0',
        text: 'hey',
        completed: true
      },
      {
        id: '3df29b26-8f55-4722-abbd-428a3b3d3306',
        text: 'ho',
        completed: true
      },
      {
        id: 'afe441fd-b058-4eef-be6c-867f9956eba3',
        text: 'let us go',
        completed: false
      }
    ])
  })
})
