import React, { useState, useRef } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { useUI } from '../../context/UIContext';
import { useSnippets } from '../../hooks/useSnippets';

export const SnippetsModal = ({ editorRef }) => {
  const { showSnippets, setShowSnippets } = useUI();
  const { snippets, addSnippet, deleteSnippet } = useSnippets();
  const [newSnippet, setNewSnippet] = useState('');

  const handleAdd = () => {
    if (addSnippet(newSnippet)) {
      setNewSnippet('');
    }
  };

  const handleInsert = (code) => {
    if (editorRef?.current) {
      const selection = editorRef.current.getSelection();
      editorRef.current.executeEdits('', [{
        range: selection,
        text: code,
      }]);
      setShowSnippets(false);
    }
  };

  return (
    <Modal show={showSnippets} onHide={() => setShowSnippets(false)} size="lg" data-theme="dark">
      <Modal.Header closeButton className="neovim-modal-header">
        <Modal.Title>Code Snippets</Modal.Title>
      </Modal.Header>
      <Modal.Body className="neovim-modal-body">
        <Form.Group className="mb-3">
          <Form.Label>New Snippet</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={newSnippet}
            onChange={(e) => setNewSnippet(e.target.value)}
            placeholder="Paste your code snippet..."
            style={{ fontFamily: 'var(--font-mono)' }}
          />
          <Button className="mt-2" variant="success" onClick={handleAdd}>
            Add Snippet
          </Button>
        </Form.Group>
        <hr />
        <h6>Saved Snippets</h6>
        <ListGroup>
          {snippets.map(snippet => (
            <ListGroup.Item key={snippet.id} className="d-flex justify-content-between align-items-start neovim-list-item">
              <code className="flex-grow-1" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                {snippet.code.substring(0, 100)}{snippet.code.length > 100 ? '...' : ''}
              </code>
              <div className="ms-2">
                <Button size="sm" variant="success" className="me-2" onClick={() => handleInsert(snippet.code)}>
                  Insert
                </Button>
                <Button size="sm" variant="danger" onClick={() => deleteSnippet(snippet.id)}>
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
          {snippets.length === 0 && (
            <p className="text-muted mt-2">No snippets saved yet</p>
          )}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};
