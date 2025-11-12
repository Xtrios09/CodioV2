import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import './FileExplorer.css';

export const FileExplorer = () => {
  const { files, activeFileId, setActiveFileId, deleteFile, renameFile } = useProject();
  const [editingFileId, setEditingFileId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleRename = (fileId, currentName) => {
    setEditingFileId(fileId);
    setEditName(currentName);
  };

  const handleRenameSubmit = (fileId) => {
    if (editName.trim()) {
      renameFile(fileId, editName.trim());
    }
    setEditingFileId(null);
  };

  const handleDelete = (fileId, fileName) => {
    if (window.confirm(`Delete ${fileName}?`)) {
      deleteFile(fileId);
    }
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <span>FILES</span>
      </div>
      <div className="file-list">
        {files.map(file => (
          <div
            key={file.id}
            className={`file-item ${file.id === activeFileId ? 'active' : ''}`}
            onClick={() => setActiveFileId(file.id)}
          >
            {editingFileId === file.id ? (
              <input
                className="file-rename-input"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={() => handleRenameSubmit(file.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenameSubmit(file.id);
                  if (e.key === 'Escape') setEditingFileId(null);
                }}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            ) : (
              <>
                <span className="file-icon">
                  {file.language === 'javascript' ? '◆' :
                   file.language === 'python' ? '◈' :
                   file.language === 'html' ? '◇' :
                   file.language === 'css' ? '◯' : '●'}
                </span>
                <span className="file-name">{file.name}</span>
                <div className="file-actions">
                  <button
                    className="file-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(file.id, file.name);
                    }}
                    title="Rename"
                  >
                    ✏
                  </button>
                  <button
                    className="file-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file.id, file.name);
                    }}
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
