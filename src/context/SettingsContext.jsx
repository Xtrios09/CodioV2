import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [lineNumbers, setLineNumbers] = useState(true);

  useEffect(() => {
    const savedSettings = localStorage.getItem('editorSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setTheme(settings.theme || 'vs-dark');
        setFontSize(settings.fontSize || 14);
        setLineNumbers(settings.lineNumbers !== false);
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('editorSettings', JSON.stringify({ theme, fontSize, lineNumbers }));
  }, [theme, fontSize, lineNumbers]);

  const value = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    lineNumbers,
    setLineNumbers,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
