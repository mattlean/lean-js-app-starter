import { v4 } from 'uuid'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const mockDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true
  }, {
    id: v4(),
    text: 'ho',
    completed: true
  }, {
    id: v4(),
    text: 'let us go',
    completed: false
  }]
}

export const addTodo = text =>
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false
    }
    mockDatabase.todos.push(todo)
    return todo
  })

export const fetchTodos = filter => delay(500).then(() => {
  // if(Math.random() > 0.5) {
  //   throw new Error('Boom!')
  // }

  switch(filter) {
    case 'all':
      return mockDatabase.todos
    case 'active':
      return mockDatabase.todos.filter(t => !t.completed)
    case 'completed':
      return mockDatabase.todos.filter(t => t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}`)
  }
})

export const toggleTodo = id =>
  delay(500).then(() => {
    const todo = mockDatabase.todos.find(t => t.id === id)
    todo.completed = !todo.completed
    return todo
  })
