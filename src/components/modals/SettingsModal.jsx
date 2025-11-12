import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSettings } from '../../context/SettingsContext';
import { useUI } from '../../context/UIContext';

export const SettingsModal = () => {
  const { theme, setTheme, fontSize, setFontSize, lineNumbers, setLineNumbers } = useSettings();
  const { showSettings, setShowSettings } = useUI();

  return (
    <Modal show={showSettings} onHide={() => setShowSettings(false)} data-theme="dark">
      <Modal.Header closeButton className="neovim-modal-header">
        <Modal.Title>Editor Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body className="neovim-modal-body">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Theme</Form.Label>
            <Form.Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="vs-dark">Dark</option>
              <option value="vs-light">Light</option>
              <option value="monokai">Monokai</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Font Size</Form.Label>
            <Form.Control
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="10"
              max="24"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Show Line Numbers"
              checked={lineNumbers}
              onChange={(e) => setLineNumbers(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="neovim-modal-footer">
        <Button variant="primary" onClick={() => setShowSettings(false)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
