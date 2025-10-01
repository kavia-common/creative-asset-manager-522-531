import React from 'react';

// PUBLIC_INTERFACE
export default function SidebarNav({ onOpenUpload }) {
  /** Sidebar navigation with branding and quick links */
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="brand" aria-label="Brand">
        <img
          src="/assets/20251001_183050_Sphere_Blue.png"
          alt="Creative Assets logo"
          className="brand-logo"
          width={34}
          height={34}
          style={{ borderRadius: 10, objectFit: 'cover', boxShadow: 'inset 0 1px 2px rgba(255,255,255,.12), 0 6px 14px rgba(37,99,235,.24)' }}
        />
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
