import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const defaultFile = {
    id: '1',
    name: 'index.js',
    language: 'javascript',
    code: '// Welcome to Code Editor Pro\n// Neovim-inspired professional code editor\n\nconsole.log("Hello, World!");',
    lastModified: new Date().toISOString(),
  };

  const [files, setFiles] = useState([defaultFile]);
  const [activeFileId, setActiveFileId] = useState('1');
  const autoSaveTimerRef = useRef(null);

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  useEffect(() => {
    const savedFiles = localStorage.getItem('editorFiles');
    if (savedFiles) {
      try {
        const parsed = JSON.parse(savedFiles);
        setFiles(parsed);
        if (parsed.length > 0) setActiveFileId(parsed[0].id);
      } catch (e) {
        console.error('Failed to load saved files', e);
      }
    }
  }, []);

  useEffect(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    autoSaveTimerRef.current = setTimeout(() => {
      localStorage.setItem('editorFiles', JSON.stringify(files));
    }, 1000);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [files]);

  const updateFileCode = (fileId, newCode) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, code: newCode, lastModified: new Date().toISOString() }
          : file
      )
    );
  };

  const createFile = (name = null, language = 'javascript') => {
    const newId = String(Date.now());
    const fileName = name || `untitled-${files.length + 1}.${language === 'javascript' ? 'js' : language}`;
    const newFile = {
      id: newId,
      name: fileName,
      language,
      code: '',
      lastModified: new Date().toISOString(),
    };
    setFiles([...files, newFile]);
    setActiveFileId(newId);
    return newFile;
  };

  const deleteFile = (fileId) => {
    if (files.length === 1) return false;
    const newFiles = files.filter(f => f.id !== fileId);
    setFiles(newFiles);
    if (activeFileId === fileId) {
      setActiveFileId(newFiles[0].id);
    }
    return true;
  };

  const renameFile = (fileId, newName) => {
    setFiles(files.map(f => 
      f.id === fileId ? { ...f, name: newName } : f
    ));
  };

  const setFileLanguage = (fileId, language) => {
    setFiles(files.map(f => 
      f.id === fileId ? { ...f, language } : f
    ));
  };

  const importProject = (projectData) => {
    if (projectData.files && Array.isArray(projectData.files)) {
      setFiles(projectData.files);
      setActiveFileId(projectData.files[0].id);
      return true;
    }
    return false;
  };

  const value = {
    files,
    activeFile,
    activeFileId,
    setActiveFileId,
    updateFileCode,
    createFile,
    deleteFile,
    renameFile,
    setFileLanguage,
    importProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
