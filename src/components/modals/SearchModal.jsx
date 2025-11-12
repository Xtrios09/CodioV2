import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useUI } from '../../context/UIContext';

export const SearchModal = ({ editorRef }) => {
  const { showSearch, setShowSearch } = useUI();
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [searchRegex, setSearchRegex] = useState(false);
  const [searchCaseSensitive, setSearchCaseSensitive] = useState(false);

  const handleSearch = () => {
    if (!editorRef?.current || !searchText) return;

    const model = editorRef.current.getModel();
    const matches = model.findMatches(
      searchText,
      true,
      searchRegex,
      searchCaseSensitive,
      null,
      true
    );

    if (matches.length > 0) {
      editorRef.current.setSelection(matches[0].range);
      editorRef.current.revealLineInCenter(matches[0].range.startLineNumber);
    }
  };

  const handleReplaceAll = () => {
    if (!editorRef?.current || !searchText) return;

    const model = editorRef.current.getModel();
    const matches = model.findMatches(
      searchText,
      true,
      searchRegex,
      searchCaseSensitive,
      null,
      true
    );

    editorRef.current.executeEdits('', matches.map(match => ({
      range: match.range,
      text: replaceText,
    })));
  };

  return (
    <Modal show={showSearch} onHide={() => setShowSearch(false)} data-theme="dark">
      <Modal.Header closeButton className="neovim-modal-header">
        <Modal.Title>Find & Replace</Modal.Title>
      </Modal.Header>
      <Modal.Body className="neovim-modal-body">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Find</Form.Label>
            <Form.Control
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search text..."
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Replace with</Form.Label>
            <Form.Control
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replacement text..."
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Use Regex"
              checked={searchRegex}
              onChange={(e) => setSearchRegex(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Case Sensitive"
              checked={searchCaseSensitive}
              onChange={(e) => setSearchCaseSensitive(e.target.checked)}
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button onClick={handleSearch}>Find Next</Button>
            <Button onClick={handleReplaceAll} variant="warning">Replace All</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
