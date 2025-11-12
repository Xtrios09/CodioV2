import { useEffect } from 'react';

export const useKeyboardShortcuts = (handlers) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier && e.key === 's') {
        e.preventDefault();
        handlers.onSave?.();
      } else if (modifier && e.key === 'h') {
        e.preventDefault();
        handlers.onSearch?.();
      } else if (modifier && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        handlers.onToggleSidebar?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
};
