import React from 'react';

// PUBLIC_INTERFACE
export default function TopBar({ theme, onToggleTheme, onOpenUpload, query, setQuery }) {
  /** Top bar with search field, upload action, and theme toggle */
  return (
    <div className="topbar" role="region" aria-label="Top bar">
      <div className="search" role="search">
        <span aria-hidden="true">🔎</span>
        <input
          type="search"
          placeholder="Search assets by name, description, or tags…"
          aria-label="Search assets"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button className="btn primary" onClick={onOpenUpload} aria-label="Open upload dialog">
        ⬆️ Upload
      </button>
      <button className="btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
}
