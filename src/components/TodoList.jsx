import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onToggleComplete, onEditTodo, onDeleteTodo, getFolderById }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>표시할 할일이 없습니다 📝</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          folder={getFolderById(todo.folderId)}
          onToggleComplete={onToggleComplete}
          onEdit={onEditTodo}
          onDelete={onDeleteTodo}
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}
    </div>
  );
}

export default TodoList;
