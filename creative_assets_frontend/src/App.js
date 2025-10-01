import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import SidebarNav from './components/SidebarNav';
import FiltersPanel from './components/FiltersPanel';
import AssetGrid from './components/AssetGrid';
import UploadModal from './components/UploadModal';
import EditModal from './components/EditModal';
import TopBar from './components/TopBar';
import { AssetService } from './services/api';

/**
 * Root application implementing Ocean Professional themed UI for managing creative assets.
 * Layout:
 * - Left: SidebarNav (primary navigation)
 * - Center: Main content with TopBar and AssetGrid
 * - Right: FiltersPanel (search, filter)
 * Modals:
 * - UploadModal: upload images/videos
 * - EditModal: edit metadata
 */
function App() {
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [editAsset, setEditAsset] = useState(null);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'image' | 'video'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'name'
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Initial load of assets from placeholder service
    let active = true;
    setLoading(true);
    AssetService.listAssets()
      .then(list => {
        if (!active) return;
        setAssets(list);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filteredAssets = useMemo(() => {
    let list = [...assets];
    if (typeFilter !== 'all') {
      list = list.filter(a => a.type === typeFilter);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        a =>
          a.name.toLowerCase().includes(q) ||
          (a.description || '').toLowerCase().includes(q) ||
          (a.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }
    if (selectedTags.length > 0) {
      list = list.filter(a => selectedTags.every(t => (a.tags || []).includes(t)));
    }
    if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [assets, typeFilter, query, sortBy, selectedTags]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleUpload = async (files, meta) => {
    // meta: {tags: string[], description: string}
    setLoading(true);
    try {
      const created = await AssetService.uploadAssets(files, meta);
      setAssets(prev => [...created, ...prev]);
      setShowUpload(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async asset => {
    setLoading(true);
    try {
      await AssetService.deleteAsset(asset.id);
      setAssets(prev => prev.filter(a => a.id !== asset.id));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async (id, updates) => {
    setLoading(true);
    try {
      const updated = await AssetService.updateAsset(id, updates);
      setAssets(prev => prev.map(a => (a.id === id ? updated : a)));
      setEditAsset(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ocean-app">
      <SidebarNav onOpenUpload={() => setShowUpload(true)} />
      <main className="ocean-main">
        <TopBar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenUpload={() => setShowUpload(true)}
          query={query}
          setQuery={setQuery}
        />
        <div className="ocean-content">
          <AssetGrid
            assets={filteredAssets}
            loading={loading}
            onDelete={handleDelete}
            onEdit={setEditAsset}
          />
          <FiltersPanel
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            selectedTags={selectedTags}
            onSelectedTagsChange={setSelectedTags}
            allTags={Array.from(new Set(assets.flatMap(a => a.tags || []))).sort()}
          />
        </div>
      </main>

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}
      {editAsset && (
        <EditModal
          asset={editAsset}
          onClose={() => setEditAsset(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;
