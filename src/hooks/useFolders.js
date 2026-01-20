import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from '../utils/uuid';

const DEFAULT_FOLDERS = [
  { id: 'folder-1', name: '업무', color: '#FFB6C1' }, // Pink
  { id: 'folder-2', name: '개인', color: '#E6E6FA' }, // Lavender
  { id: 'folder-3', name: '공부', color: '#B0E0E6' }, // Mint
];

export function useFolders() {
  const [folders, setFolders] = useLocalStorage('folders', DEFAULT_FOLDERS);

  const addFolder = (name, color) => {
    const newFolder = {
      id: uuidv4(),
      name,
      color,
    };
    setFolders([...folders, newFolder]);
    return newFolder;
  };

  const updateFolder = (id, updates) => {
    setFolders(folders.map(folder => 
      folder.id === id ? { ...folder, ...updates } : folder
    ));
  };

  const deleteFolder = (id) => {
    setFolders(folders.filter(folder => folder.id !== id));
  };

  const getFolderById = (id) => {
    return folders.find(folder => folder.id === id);
  };

  return {
    folders,
    addFolder,
    updateFolder,
    deleteFolder,
    getFolderById,
  };
}
