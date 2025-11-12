import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { useUI } from '../../context/UIContext';
import './TopBar.css';

export const TopBar = ({ onSave, onExportZip, onImport }) => {
  const { createFile, setFileLanguage, activeFileId } = useProject();
  const { 
    setShowSidebar,
    setShowSnippets,
    setShowPreview,
    setShowHistory,
    setShowPackageManager,
    setShowSettings,
    showPreview,
  } = useUI();

  return (
    <div className="topbar">
      <div className="topbar-brand">
        <span className="topbar-icon">▪</span>
        <span>CODIO</span>
      </div>

      <div className="topbar-actions">
        <button className="topbar-btn" onClick={() => setShowSidebar(prev => !prev)} title="Toggle Files (Ctrl+Shift+F)">
          <span className="icon">📁</span>
          <span>Files</span>
        </button>

        <button className="topbar-btn" onClick={() => createFile()} title="New File">
          <span className="icon">+</span>
          <span>New</span>
        </button>

        <div className="topbar-separator" />

        <button className="topbar-btn" onClick={() => setFileLanguage(activeFileId, 'javascript')}>
          JS
        </button>
        <button className="topbar-btn" onClick={() => setFileLanguage(activeFileId, 'python')}>
          PY
        </button>
        <button className="topbar-btn" onClick={() => setFileLanguage(activeFileId, 'html')}>
          HTML
        </button>
        <button className="topbar-btn" onClick={() => setFileLanguage(activeFileId, 'css')}>
          CSS
        </button>

        <div className="topbar-separator" />

        <button className="topbar-btn" onClick={onSave} title="Save Project (Ctrl+S)">
          <span className="icon">💾</span>
          <span>Save</span>
        </button>

        <button className="topbar-btn" onClick={onExportZip}>
          <span className="icon">📦</span>
          <span>ZIP</span>
        </button>

        <label className="topbar-btn" title="Import Project">
          <span className="icon">📥</span>
          <span>Import</span>
          <input type="file" accept=".json" onChange={onImport} style={{ display: 'none' }} />
        </label>

        <div className="topbar-separator" />

        <button className="topbar-btn" onClick={() => setShowSnippets(true)}>
          Snippets
        </button>

        <button className="topbar-btn" onClick={() => setShowPreview(prev => !prev)}>
          <span className="icon">{showPreview ? '📝' : '👁'}</span>
          <span>{showPreview ? 'Editor' : 'Preview'}</span>
        </button>

        <button className="topbar-btn" onClick={() => setShowHistory(true)}>
          History
        </button>

        <button className="topbar-btn" onClick={() => setShowPackageManager(true)}>
          Packages
        </button>

        <button className="topbar-btn" onClick={() => setShowSettings(true)}>
          <span className="icon">⚙</span>
        </button>
      </div>
    </div>
  );
};
