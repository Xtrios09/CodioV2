import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ExecutionHistoryContext = createContext(null);

export const ExecutionHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('executionHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse execution history:', error);
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('executionHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((fileId, fileName, code) => {
    const entry = {
      id: Date.now(),
      fileId,
      fileName,
      code,
      timestamp: new Date().toISOString(),
    };

    setHistory(prev => [entry, ...prev].slice(0, 50));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <ExecutionHistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </ExecutionHistoryContext.Provider>
  );
};

export const useExecutionHistory = () => {
  const context = useContext(ExecutionHistoryContext);
  if (!context) {
    throw new Error('useExecutionHistory must be used within ExecutionHistoryProvider');
  }
  return context;
};
