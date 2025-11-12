import { useState, useEffect } from 'react';

export const useSnippets = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const savedSnippets = localStorage.getItem('codeSnippets');
    if (savedSnippets) {
      try {
        setSnippets(JSON.parse(savedSnippets));
      } catch (e) {
        console.error('Failed to load snippets', e);
      }
    }
  }, []);

  const addSnippet = (code) => {
    if (!code.trim()) return false;
    const newSnippet = { id: Date.now(), code };
    const updated = [...snippets, newSnippet];
    setSnippets(updated);
    localStorage.setItem('codeSnippets', JSON.stringify(updated));
    return true;
  };

  const deleteSnippet = (id) => {
    const updated = snippets.filter(s => s.id !== id);
    setSnippets(updated);
    localStorage.setItem('codeSnippets', JSON.stringify(updated));
  };

  return { snippets, addSnippet, deleteSnippet };
};
