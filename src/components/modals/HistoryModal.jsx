import React from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import { useUI } from '../../context/UIContext';
import { useProject } from '../../context/ProjectContext';
import { useExecutionHistory } from '../../context/ExecutionHistoryContext';

export const HistoryModal = () => {
  const { showHistory, setShowHistory } = useUI();
  const { setActiveFileId } = useProject();
  const { history } = useExecutionHistory();

  return (
    <Modal show={showHistory} onHide={() => setShowHistory(false)} size="lg" data-theme="dark">
      <Modal.Header closeButton className="neovim-modal-header">
        <Modal.Title>Execution History</Modal.Title>
      </Modal.Header>
      <Modal.Body className="neovim-modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <ListGroup>
          {history.map(entry => (
            <ListGroup.Item key={entry.id} className="neovim-list-item">
              <div><strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-accent)' }}>{entry.fileName}</strong></div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                {new Date(entry.timestamp).toLocaleString()}
              </div>
              <Button
                size="sm"
                className="mt-2"
                variant="outline-primary"
                onClick={() => {
                  setActiveFileId(entry.fileId);
                  setShowHistory(false);
                }}
              >
                View File
              </Button>
            </ListGroup.Item>
          ))}
          {history.length === 0 && (
            <p className="text-muted mt-2">No execution history yet</p>
          )}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};
