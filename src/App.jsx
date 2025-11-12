import React, { useRef } from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { UIProvider, useUI } from './context/UIContext';
import { SettingsProvider } from './context/SettingsContext';
import { ExecutionHistoryProvider, useExecutionHistory } from './context/ExecutionHistoryContext';
import { TopBar } from './components/layout/TopBar';
import { FileExplorer } from './components/layout/FileExplorer';
import { TabBar } from './components/layout/TabBar';
import { StatusBar } from './components/layout/StatusBar';
import { CodeEditor } from './components/editor/CodeEditor';
import { PreviewPane } from './components/features/PreviewPane';
import { SettingsModal } from './components/modals/SettingsModal';
import { SnippetsModal } from './components/modals/SnippetsModal';
import { SearchModal } from './components/modals/SearchModal';
import { HistoryModal } from './components/modals/HistoryModal';
import { PackageManagerModal } from './components/modals/PackageManagerModal';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { exportToJSON, exportToZip, importFromJSON } from './utils/fileOperations';
import './App.css';

function AppContent() {
  const { files, importProject, activeFile } = useProject();
  const { showSidebar, showPreview, setShowSearch, setShowSidebar } = useUI();
  const { addToHistory } = useExecutionHistory();
  const editorRef = useRef(null);

  const handleSave = () => {
    exportToJSON(files);
  };

  const handleExportZip = async () => {
    await exportToZip(files);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await importFromJSON(file);
      if (importProject(data)) {
        alert('Project imported successfully!');
      } else {
        alert('Invalid project file');
      }
    } catch (error) {
      alert(`Failed to import project: ${error.message}`);
    }
  };

  const handleRun = () => {
    if (activeFile) {
      addToHistory(activeFile.id, activeFile.name, activeFile.code);
    }
  };

  useKeyboardShortcuts({
    onSave: handleSave,
    onSearch: () => setShowSearch(true),
    onToggleSidebar: () => setShowSidebar(prev => !prev),
  });

  return (
    <div className="app-container">
      <TopBar
        onSave={handleSave}
        onExportZip={handleExportZip}
        onImport={handleImport}
      />

      <div className="app-body">
        {showSidebar && <FileExplorer />}

        <div className="app-main">
          <TabBar />
          
          <div className="app-editor-area">
            <div className={`editor-container ${showPreview ? 'split' : ''}`}>
              <CodeEditor ref={editorRef} />
            </div>

            {showPreview && <PreviewPane />}
          </div>
        </div>
      </div>

      <StatusBar />

      <SettingsModal />
      <SnippetsModal editorRef={editorRef} />
      <SearchModal editorRef={editorRef} />
      <HistoryModal />
      <PackageManagerModal />
    </div>
  );
}

function App() {
  return (
    <ProjectProvider>
      <UIProvider>
        <SettingsProvider>
          <ExecutionHistoryProvider>
            <AppContent />
          </ExecutionHistoryProvider>
        </SettingsProvider>
      </UIProvider>
    </ProjectProvider>
  );
}

export default App;
