import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
};

export const UIProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPackageManager, setShowPackageManager] = useState(false);

  const value = {
    showSidebar,
    setShowSidebar,
    showPreview,
    setShowPreview,
    showSettings,
    setShowSettings,
    showSnippets,
    setShowSnippets,
    showSearch,
    setShowSearch,
    showHistory,
    setShowHistory,
    showPackageManager,
    setShowPackageManager,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
