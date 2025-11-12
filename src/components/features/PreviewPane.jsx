import React, { useRef, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import './PreviewPane.css';

export const PreviewPane = () => {
  const { files } = useProject();
  const previewRef = useRef(null);

  useEffect(() => {
    updatePreview();
  }, [files]);

  const updatePreview = () => {
    if (!previewRef.current) return;

    const htmlFile = files.find(f => f.language === 'html');
    const cssFile = files.find(f => f.language === 'css');
    const jsFile = files.find(f => f.language === 'javascript');

    const html = htmlFile ? htmlFile.code : '<h1>Add HTML file to see preview</h1>';
    const css = cssFile ? `<style>${cssFile.code}</style>` : '';
    const js = jsFile ? `<script>${jsFile.code}</script>` : '';

    const fullHtml = html.includes('<html>') 
      ? html.replace('</head>', `${css}</head>`).replace('</body>', `${js}</body>`)
      : `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">${css}</head><body>${html}${js}</body></html>`;

    previewRef.current.srcdoc = fullHtml;
  };

  return (
    <div className="preview-pane">
      <div className="preview-header">
        <span className="preview-icon">👁</span>
        <span>LIVE PREVIEW</span>
      </div>
      <iframe
        ref={previewRef}
        className="preview-iframe"
        title="preview"
        sandbox="allow-scripts"
      />
    </div>
  );
};
