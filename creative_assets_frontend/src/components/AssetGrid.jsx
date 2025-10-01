import React from 'react';

// PUBLIC_INTERFACE
export default function AssetGrid({ assets, loading, onEdit, onDelete }) {
  /** Grid of assets showing thumbnails and basic metadata */
  return (
    <section className="grid" aria-busy={loading} aria-live="polite">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Assets</h2>
        {loading && <div style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>Loading…</div>}
      </div>
      <div className="grid-inner" role="list">
        {assets.map(asset => (
          <article className="card" key={asset.id} role="listitem" aria-label={`${asset.name} ${asset.type}`}>
            <div className="thumb" aria-hidden="true">
              {asset.type === 'image' ? (
                <img src={asset.thumbnailUrl || asset.url} alt={asset.name} loading="lazy" />
              ) : (
                <video src={asset.url} aria-label={`${asset.name} preview`} />
              )}
            </div>
            <div className="card-body">
              <div className="card-title">{asset.name}</div>
              <div className="card-meta">
                {asset.type.toUpperCase()} • {new Date(asset.createdAt).toLocaleDateString()}
              </div>
              <div className="tags">
                {(asset.tags || []).slice(0, 3).map(t => (
                  <span className="tag" key={t}>#{t}</span>
                ))}
              </div>
              <div className="card-actions">
                <button className="btn" onClick={() => onEdit(asset)} aria-label={`Edit ${asset.name}`}>Edit</button>
                <button className="btn danger" onClick={() => onDelete(asset)} aria-label={`Delete ${asset.name}`}>Delete</button>
              </div>
            </div>
          </article>
        ))}
        {assets.length === 0 && !loading && (
          <div style={{ color: 'var(--color-text-dim)', fontSize: 14 }}>
            No assets to display. Try uploading something!
          </div>
        )}
      </div>
    </section>
  );
}
