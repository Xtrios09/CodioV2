import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { useSettings } from '../../context/SettingsContext';
import './StatusBar.css';

export const StatusBar = () => {
  const { activeFile, files } = useProject();
  const { theme, fontSize } = useSettings();

  const getLineCount = () => {
    if (!activeFile) return 0;
    return activeFile.code.split('\n').length;
  };

  return (
    <div className="status-bar">
      <div className="status-item">
        <span className="status-icon">◆</span>
        <span>{activeFile?.name || 'No file'}</span>
      </div>
      
      <div className="status-item">
        {activeFile?.language?.toUpperCase() || 'TEXT'}
      </div>

      <div className="status-item">
        Lines: {getLineCount()}
      </div>

      <div className="status-spacer" />

      <div className="status-item">
        {files.length} file{files.length !== 1 ? 's' : ''}
      </div>

      <div className="status-item">
        {theme === 'vs-dark' ? 'Dark' : theme === 'vs-light' ? 'Light' : 'Monokai'}
      </div>

      <div className="status-item">
        {fontSize}px
      </div>
    </div>
  );
};
