import { useState, useEffect } from 'react';
import './TodoForm.css';

function TodoForm({ todo, folders, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    memo: '',
    dueDate: '',
    dueTime: '',
    folderId: '',
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        memo: todo.memo || '',
        dueDate: todo.dueDate || '',
        dueTime: todo.dueTime || '',
        folderId: todo.folderId || '',
      });
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{todo ? '할일 수정' : '새 할일 추가'}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="todo-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="할일 제목을 입력하세요"
              required
              autoFocus
            />
          </div>

          {/* Memo */}
          <div className="form-group">
            <label htmlFor="memo">메모</label>
            <textarea
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleChange}
              placeholder="상세 내용을 입력하세요"
              rows="4"
            />
          </div>

          {/* Date and Time */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate">기한 날짜</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dueTime">시간</label>
              <input
                type="time"
                id="dueTime"
                name="dueTime"
                value={formData.dueTime}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Folder */}
          <div className="form-group">
            <label htmlFor="folderId">폴더</label>
            <select
              id="folderId"
              name="folderId"
              value={formData.folderId}
              onChange={handleChange}
            >
              <option value="">폴더 선택 안함</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              {todo ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
