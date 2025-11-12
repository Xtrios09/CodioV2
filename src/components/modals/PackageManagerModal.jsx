import React, { useState } from 'react';
import { Modal, Form, Button, InputGroup, ListGroup } from 'react-bootstrap';
import { useUI } from '../../context/UIContext';

export const PackageManagerModal = () => {
  const { showPackageManager, setShowPackageManager } = useUI();
  const [packageSearch, setPackageSearch] = useState('');
  const [packages, setPackages] = useState([]);

  return (
    <Modal show={showPackageManager} onHide={() => setShowPackageManager(false)} data-theme="dark">
      <Modal.Header closeButton className="neovim-modal-header">
        <Modal.Title>Package Manager</Modal.Title>
      </Modal.Header>
      <Modal.Body className="neovim-modal-body">
        <Form.Group className="mb-3">
          <Form.Label>Search NPM Packages</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter package name..."
              value={packageSearch}
              onChange={(e) => setPackageSearch(e.target.value)}
              style={{ fontFamily: 'var(--font-mono)' }}
            />
            <Button variant="primary">Search</Button>
          </InputGroup>
          <Form.Text className="text-muted">
            Package manager UI ready. Backend integration required for npm operations.
          </Form.Text>
        </Form.Group>
        <hr />
        <h6>Installed Packages</h6>
        <ListGroup>
          {packages.map(pkg => (
            <ListGroup.Item key={pkg.name} className="d-flex justify-content-between neovim-list-item">
              <div>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{pkg.name}</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{pkg.version}</div>
              </div>
              <Button size="sm" variant="danger">Uninstall</Button>
            </ListGroup.Item>
          ))}
          {packages.length === 0 && (
            <p className="text-muted">No packages installed yet</p>
          )}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};
