import { useState, useMemo } from 'react';
import FolderManager from './FolderManager';
import './FolderSidebar.css';

function FolderSidebar({ 
  folders, 
  selectedFolderId, 
  onSelectFolder, 
  onAddFolder, 
  onUpdateFolder, 
  onDeleteFolder,
  todos,
  isOpen,
  onClose
}) {
  const [isManaging, setIsManaging] = useState(false);

  // Calculate todo counts per folder
  const folderCounts = useMemo(() => {
    const counts = {};
    folders.forEach(folder => {
      counts[folder.id] = todos.filter(todo => 
        todo.folderId === folder.id && !todo.completed
      ).length;
    });
    return counts;
  }, [folders, todos]);

  const totalCount = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <aside className={`folder-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>폴더</h2>
          <button 
            className="btn-icon sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* All Todos */}
        <button
          className={`folder-item ${selectedFolderId === 'all' ? 'active' : ''}`}
          onClick={() => {
            onSelectFolder('all');
            onClose();
          }}
        >
          <span className="folder-icon" style={{ color: 'var(--color-mint)' }}>📋</span>
          <span className="folder-name">전체 할일</span>
          <span className="folder-count">{totalCount}</span>
        </button>

        <div className="sidebar-divider"></div>

        {/* Folders List */}
        <div className="folders-list">
          {folders.map((folder, index) => (
            <button
              key={folder.id}
              className={`folder-item ${selectedFolderId === folder.id ? 'active' : ''} stagger-item`}
              onClick={() => {
                onSelectFolder(folder.id);
                onClose();
              }}
              style={{ 
                animationDelay: `${index * 0.05}s`,
                borderLeft: selectedFolderId === folder.id ? `4px solid ${folder.color}` : 'none'
              }}
            >
              <span 
                className="folder-color-dot" 
                style={{ backgroundColor: folder.color }}
              ></span>
              <span className="folder-name">{folder.name}</span>
              <span className="folder-count">{folderCounts[folder.id] || 0}</span>
            </button>
          ))}
        </div>

        {/* Manage Folders Button */}
        <button 
          className="btn btn-secondary manage-folders-btn"
          onClick={() => setIsManaging(true)}
        >
          ⚙️ 폴더 관리
        </button>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}

      {/* Folder Manager Modal */}
      {isManaging && (
        <FolderManager
          folders={folders}
          onAddFolder={onAddFolder}
          onUpdateFolder={onUpdateFolder}
          onDeleteFolder={onDeleteFolder}
          onClose={() => setIsManaging(false)}
        />
      )}
    </>
  );
}

export default FolderSidebar;
