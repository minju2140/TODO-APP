import { useState } from 'react';
import './FolderManager.css';

const PASTEL_COLORS = [
  { name: '핑크', color: '#FFB6C1' },
  { name: '라벤더', color: '#E6E6FA' },
  { name: '민트', color: '#B0E0E6' },
  { name: '피치', color: '#FFDAB9' },
  { name: '라일락', color: '#DDA0DD' },
  { name: '스카이', color: '#D4E7FF' },
  { name: '레몬', color: '#FFF9B0' },
  { name: '로즈', color: '#FFD4E5' },
];

function FolderManager({ folders, onAddFolder, onUpdateFolder, onDeleteFolder, onClose }) {
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PASTEL_COLORS[0].color);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingColor, setEditingColor] = useState('');

  const handleAddFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) {
      alert('폴더 이름을 입력해주세요.');
      return;
    }
    onAddFolder(newFolderName.trim(), selectedColor);
    setNewFolderName('');
    setSelectedColor(PASTEL_COLORS[0].color);
  };

  const handleStartEdit = (folder) => {
    setEditingId(folder.id);
    setEditingName(folder.name);
    setEditingColor(folder.color);
  };

  const handleSaveEdit = () => {
    if (!editingName.trim()) {
      alert('폴더 이름을 입력해주세요.');
      return;
    }
    onUpdateFolder(editingId, { name: editingName.trim(), color: editingColor });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setEditingColor('');
  };

  const handleDeleteFolder = (id) => {
    if (window.confirm('이 폴더를 삭제하시겠습니까?')) {
      onDeleteFolder(id);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content folder-manager" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>폴더 관리</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="folder-manager-content">
          {/* Add New Folder */}
          <form onSubmit={handleAddFolder} className="add-folder-form">
            <h3>새 폴더 추가</h3>
            <div className="form-group">
              <label>폴더 이름</label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="예: 쇼핑, 운동 등"
                maxLength={20}
              />
            </div>

            <div className="form-group">
              <label>색상 선택</label>
              <div className="color-picker">
                {PASTEL_COLORS.map(({ name, color }) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={name}
                  >
                    {selectedColor === color && '✓'}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              + 폴더 추가
            </button>
          </form>

          <div className="divider"></div>

          {/* Existing Folders */}
          <div className="existing-folders">
            <h3>기존 폴더</h3>
            {folders.length === 0 ? (
              <p className="no-folders">폴더가 없습니다.</p>
            ) : (
              <div className="folders-grid">
                {folders.map(folder => (
                  <div key={folder.id} className="folder-card">
                    {editingId === folder.id ? (
                      // Edit Mode
                      <div className="folder-edit-mode">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          maxLength={20}
                          autoFocus
                        />
                        <div className="color-picker-small">
                          {PASTEL_COLORS.map(({ color }) => (
                            <button
                              key={color}
                              type="button"
                              className={`color-option-small ${editingColor === color ? 'selected' : ''}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setEditingColor(color)}
                            >
                              {editingColor === color && '✓'}
                            </button>
                          ))}
                        </div>
                        <div className="folder-edit-actions">
                          <button className="btn-icon" onClick={handleSaveEdit} title="저장">
                            ✓
                          </button>
                          <button className="btn-icon" onClick={handleCancelEdit} title="취소">
                            ✕
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <div className="folder-card-header">
                          <span 
                            className="folder-color-badge"
                            style={{ backgroundColor: folder.color }}
                          ></span>
                          <span className="folder-card-name">{folder.name}</span>
                        </div>
                        <div className="folder-card-actions">
                          <button 
                            className="btn-icon" 
                            onClick={() => handleStartEdit(folder)}
                            title="수정"
                          >
                            ✏️
                          </button>
                          <button 
                            className="btn-icon" 
                            onClick={() => handleDeleteFolder(folder.id)}
                            title="삭제"
                          >
                            🗑️
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FolderManager;
