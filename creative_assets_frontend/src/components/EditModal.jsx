import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function EditModal({ asset, onClose, onSave }) {
  /** Modal dialog to edit asset metadata */
  const [name, setName] = useState(asset?.name || '');
  const [description, setDescription] = useState(asset?.description || '');
  const [tags, setTags] = useState((asset?.tags || []).join(', '));

  useEffect(() => {
    setName(asset?.name || '');
    setDescription(asset?.description || '');
    setTags((asset?.tags || []).join(', '));
  }, [asset]);

  const submit = async () => {
    const updates = {
      name,
      description,
      tags: tags.split(',').map(s => s.trim()).filter(Boolean),
    };
    await onSave(asset.id, updates);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Edit asset">
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ margin: 0 }}>Edit Asset</h3>
          <button className="btn" onClick={onClose} aria-label="Close edit dialog">✕</button>
        </div>
        <div className="modal-body">
          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Description</label>
            <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Tags (comma separated)</label>
            <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn primary" onClick={submit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
