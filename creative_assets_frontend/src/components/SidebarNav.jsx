import React from 'react';

// PUBLIC_INTERFACE
export default function SidebarNav({ onOpenUpload }) {
  /** Sidebar navigation with branding and quick links */
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="brand" aria-label="Brand">
        <div className="brand-mark" aria-hidden="true" />
        <div>
          <div className="brand-name">Creative Assets</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>Ocean Professional</div>
        </div>
      </div>

      <nav className="nav-group" aria-label="Navigation">
        <button className="nav-btn primary" aria-current="page">
          🖼️ Gallery
        </button>
        <button className="nav-btn" onClick={onOpenUpload} aria-label="Open upload modal">
          ⬆️ Upload
        </button>
        <button className="nav-btn">⭐ Favorites</button>
        <button className="nav-btn">🗑️ Trash</button>
      </nav>
    </aside>
  );
}
