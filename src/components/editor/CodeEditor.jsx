import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { monaco } from '../../monacoSetup';
import { useProject } from '../../context/ProjectContext';
import { useSettings } from '../../context/SettingsContext';

export const CodeEditor = forwardRef((props, ref) => {
  const { activeFile, updateFileCode } = useProject();
  const { theme, fontSize, lineNumbers } = useSettings();
  const editorRef = useRef(null);

  const handleCodeChange = useCallback((newCode) => {
    if (activeFile) {
      updateFileCode(activeFile.id, newCode);
    }
  }, [activeFile, updateFileCode]);

  const editorDidMount = (editor) => {
    editorRef.current = editor;
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
      editor.trigger('keyboard', 'editor.action.commentLine');
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      editor.trigger('keyboard', 'actions.find');
    });
  };

  useImperativeHandle(ref, () => ({
    getModel: () => editorRef.current?.getModel(),
    getSelection: () => editorRef.current?.getSelection(),
    setSelection: (range) => editorRef.current?.setSelection(range),
    revealLineInCenter: (line) => editorRef.current?.revealLineInCenter(line),
    executeEdits: (source, edits) => editorRef.current?.executeEdits(source, edits),
  }));

  const editorOptions = {
    fontSize,
    lineNumbers: lineNumbers ? 'on' : 'off',
    minimap: { enabled: true },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
    fontLigatures: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    smoothScrolling: true,
    padding: { top: 16, bottom: 16 },
    renderLineHighlight: 'all',
    renderWhitespace: 'selection',
    bracketPairColorization: { enabled: true },
  };

  if (!activeFile) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-tertiary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
      }}>
        No file selected
      </div>
    );
  }

  return (
    <MonacoEditor
      language={activeFile.language}
      theme={theme}
      value={activeFile.code}
      options={editorOptions}
      onChange={handleCodeChange}
      editorDidMount={editorDidMount}
    />
  );
});
