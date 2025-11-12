import React from 'react';
import { useProject } from '../../context/ProjectContext';
import './TabBar.css';

export const TabBar = () => {
  const { files, activeFileId, setActiveFileId, deleteFile } = useProject();

  return (
    <div className="tab-bar">
      {files.map(file => (
        <div
          key={file.id}
          className={`tab ${file.id === activeFileId ? 'active' : ''}`}
          onClick={() => setActiveFileId(file.id)}
        >
          <span className="tab-name">{file.name}</span>
          <button
            className="tab-close"
            onClick={(e) => {
              e.stopPropagation();
              if (files.length > 1 && window.confirm(`Close ${file.name}?`)) {
                deleteFile(file.id);
              }
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
