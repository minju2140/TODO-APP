import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from '../utils/uuid';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const addTodo = (todoData) => {
    const newTodo = {
      id: uuidv4(),
      title: todoData.title,
      memo: todoData.memo || '',
      dueDate: todoData.dueDate || '',
      dueTime: todoData.dueTime || '',
      folderId: todoData.folderId || '',
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([...todos, newTodo]);
    return newTodo;
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodoComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const getTodoById = (id) => {
    return todos.find(todo => todo.id === id);
  };

  const getTodosByFolder = (folderId) => {
    return todos.filter(todo => todo.folderId === folderId);
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoComplete,
    getTodoById,
    getTodosByFolder,
  };
}
