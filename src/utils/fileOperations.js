import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const exportToJSON = (files) => {
  const projectData = JSON.stringify(
    { files, metadata: { savedAt: new Date().toISOString(), version: '1.0' } },
    null,
    2
  );
  const blob = new Blob([projectData], { type: 'application/json' });
  saveAs(blob, 'project.json');
};

export const exportToZip = async (files) => {
  const zip = new JSZip();
  files.forEach(file => {
    zip.file(file.name, file.code);
  });
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'project.zip');
};

export const importFromJSON = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
