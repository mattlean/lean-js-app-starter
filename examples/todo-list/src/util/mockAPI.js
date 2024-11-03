import { v4 } from "uuid";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockDatabase = {
  todos: [
    {
      id: "24236ed7-e956-4cad-90e9-65469c554fc0",
      text: "hey",
      completed: true,
    },
    {
      id: "3df29b26-8f55-4722-abbd-428a3b3d3306",
      text: "ho",
      completed: true,
    },
    {
      id: "afe441fd-b058-4eef-be6c-867f9956eba3",
      text: "let us go",
      completed: false,
    },
  ],
};

export const addTodo = (text) =>
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false,
    };
    mockDatabase.todos.push(todo);
    return todo;
  });

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    // if(Math.random() > 0.5) {
    //   throw new Error('Boom!')
    // }

    switch (filter) {
      case "all":
        return mockDatabase.todos;
      case "active":
        return mockDatabase.todos.filter((t) => !t.completed);
      case "completed":
        return mockDatabase.todos.filter((t) => t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });

export const toggleTodo = (id) =>
  delay(500).then(() => {
    const todo = mockDatabase.todos.find((t) => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  });
