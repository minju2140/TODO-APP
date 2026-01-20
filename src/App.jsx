import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { useFolders } from './hooks/useFolders';
import { useDateFilter } from './hooks/useDateFilter';
import Dashboard from './components/Dashboard';
import CategoryTabs from './components/CategoryTabs';
import FolderSidebar from './components/FolderSidebar';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  const [category, setCategory] = useState('today');
  const [selectedFolderId, setSelectedFolderId] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { todos, addTodo, updateTodo, deleteTodo, toggleTodoComplete } = useTodos();
  const { folders, addFolder, updateFolder, deleteFolder, getFolderById } = useFolders();
  
  const filteredTodos = useDateFilter(todos, category, selectedFolderId);

  const handleAddTodo = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleSaveTodo = (todoData) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
    } else {
      addTodo(todoData);
    }
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <FolderSidebar
        folders={folders}
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
        onAddFolder={addFolder}
        onUpdateFolder={updateFolder}
        onDeleteFolder={deleteFolder}
        todos={todos}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="app-header">
          <h1>할일 관리</h1>
          <button className="btn btn-primary" onClick={handleAddTodo}>
            + 할일 추가
          </button>
        </header>

        {/* Dashboard */}
        <Dashboard 
          todos={todos} 
          folders={folders}
          getFolderById={getFolderById}
        />

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onToggleComplete={toggleTodoComplete}
          onEditTodo={handleEditTodo}
          onDeleteTodo={deleteTodo}
          getFolderById={getFolderById}
        />
      </main>

      {/* Todo Form Modal */}
      {isFormOpen && (
        <TodoForm
          todo={editingTodo}
          folders={folders}
          onSave={handleSaveTodo}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
