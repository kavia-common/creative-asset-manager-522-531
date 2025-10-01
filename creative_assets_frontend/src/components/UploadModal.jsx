import React, { useCallback, useState } from 'react';

// PUBLIC_INTERFACE
export default function UploadModal({ onClose, onUpload }) {
  /** Modal dialog to upload images/videos with optional description and tags */
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const items = Array.from(e.dataTransfer.files || []);
    const accepted = items.filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'));
    setFiles(prev => [...prev, ...accepted]);
  }, []);

  const onPick = (e) => {
    const items = Array.from(e.target.files || []);
    const accepted = items.filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'));
    setFiles(prev => [...prev, ...accepted]);
  };

  const removeAt = (index) => setFiles(prev => prev.filter((_, i) => i !== index));

  const submit = async () => {
    const tags = tagsInput.split(',').map(s => s.trim()).filter(Boolean);
    await onUpload(files, { description, tags });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Upload assets">
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ margin: 0 }}>Upload Assets</h3>
          <button className="btn" onClick={onClose} aria-label="Close upload dialog">✕</button>
        </div>
        <div className="modal-body">
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
              border: '2px dashed var(--color-border)',
              borderRadius: 12,
              padding: 16,
              textAlign: 'center',
              background: 'rgba(37,99,235,0.06)'
            }}
            aria-label="Drag and drop files here"
          >
            <div style={{ marginBottom: 8 }}>Drag & drop images or videos here</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-dim)', marginBottom: 12 }}>or</div>
            <label className="btn primary" style={{ display: 'inline-block', cursor: 'pointer' }}>
              Choose files
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={onPick}
                style={{ display: 'none' }}
                aria-label="Choose files to upload"
              />
            </label>
          </div>

          {files.length > 0 && (
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ fontWeight: 600 }}>Selected files</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{f.name}</span>
                    <button className="btn" onClick={() => removeAt(i)} aria-label={`Remove ${f.name}`}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Description</label>
            <textarea
              className="textarea"
              placeholder="Describe your upload (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Tags (comma separated)</label>
            <input
              className="input"
              placeholder="e.g., branding, summer, promo"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn primary" onClick={submit} disabled={files.length === 0} aria-disabled={files.length === 0}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
