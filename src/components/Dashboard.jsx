import { useMemo } from 'react';
import { isToday, parseISO, format } from 'date-fns';
import './Dashboard.css';

function Dashboard({ todos, folders, getFolderById }) {
  const todayStats = useMemo(() => {
    const todayTodos = todos.filter(todo => {
      if (!todo.dueDate) return false;
      try {
        return isToday(parseISO(todo.dueDate));
      } catch {
        return false;
      }
    });

    const completed = todayTodos.filter(t => t.completed).length;
    const total = todayTodos.length;
    const pending = total - completed;

    return { todayTodos, completed, total, pending };
  }, [todos]);

  if (todayStats.total === 0) {
    return (
      <div className="dashboard slide-down">
        <h2>오늘의 일정</h2>
        <div className="dashboard-empty">
          <p>오늘 예정된 할일이 없습니다 ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard slide-down">
      <h2>오늘의 일정</h2>
      
      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card" style={{ borderLeft: `4px solid var(--color-mint)` }}>
          <div className="stat-number">{todayStats.total}</div>
          <div className="stat-label">전체</div>
        </div>
        <div className="stat-card" style={{ borderLeft: `4px solid var(--color-peach)` }}>
          <div className="stat-number">{todayStats.pending}</div>
          <div className="stat-label">진행중</div>
        </div>
        <div className="stat-card" style={{ borderLeft: `4px solid var(--color-lavender)` }}>
          <div className="stat-number">{todayStats.completed}</div>
          <div className="stat-label">완료</div>
        </div>
      </div>

      {/* Today's Todos */}
      <div className="dashboard-todos">
        {todayStats.todayTodos.map((todo, index) => {
          const folder = getFolderById(todo.folderId);
          return (
            <div 
              key={todo.id} 
              className={`dashboard-todo-card stagger-item ${todo.completed ? 'completed' : ''}`}
              style={{ 
                borderLeft: folder ? `4px solid ${folder.color}` : `4px solid var(--color-border)` 
              }}
            >
              <div className="todo-card-header">
                <h4>{todo.title}</h4>
                {todo.dueTime && (
                  <span className="todo-time">⏰ {todo.dueTime}</span>
                )}
              </div>
              {todo.memo && <p className="todo-memo">{todo.memo}</p>}
              {folder && (
                <span 
                  className="todo-folder-tag"
                  style={{ backgroundColor: folder.color }}
                >
                  {folder.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
