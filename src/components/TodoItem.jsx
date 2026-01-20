import { format, parseISO } from 'date-fns';
import './TodoItem.css';

function TodoItem({ todo, folder, onToggleComplete, onEdit, onDelete, style }) {
  const formatDueDate = () => {
    if (!todo.dueDate) return null;
    try {
      const date = parseISO(todo.dueDate);
      return format(date, 'yyyy-MM-dd');
    } catch {
      return null;
    }
  };

  return (
    <div 
      className={`todo-item ${todo.completed ? 'completed' : ''} stagger-item`}
      style={{
        ...style,
        borderLeft: folder ? `4px solid ${folder.color}` : `4px solid var(--color-border)`
      }}
    >
      {/* Checkbox */}
      <label className="todo-checkbox-container">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="todo-checkbox"
        />
        <span className="checkmark"></span>
      </label>

      {/* Content */}
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        
        {todo.memo && <p className="todo-memo">{todo.memo}</p>}
        
        <div className="todo-meta">
          {formatDueDate() && (
            <span className="todo-date">
              📅 {formatDueDate()}
              {todo.dueTime && ` ⏰ ${todo.dueTime}`}
            </span>
          )}
          {folder && (
            <span 
              className="todo-folder-badge"
              style={{ backgroundColor: folder.color }}
            >
              {folder.name}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="todo-actions">
        <button 
          className="btn-icon todo-btn-edit"
          onClick={() => onEdit(todo)}
          aria-label="Edit todo"
        >
          ✏️
        </button>
        <button 
          className="btn-icon todo-btn-delete"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
