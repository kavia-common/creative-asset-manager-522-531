import React from 'react';

// PUBLIC_INTERFACE
export default function FiltersPanel({
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortByChange,
  selectedTags,
  onSelectedTagsChange,
  allTags = [],
}) {
  /** Right sidebar with filters and sorting controls */
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onSelectedTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onSelectedTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <aside className="filters" aria-label="Filters panel">
      <h3>Filters</h3>
      <div className="filter-row" role="group" aria-label="Type">
        <label style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>Type</label>
        <div className="segmented" role="tablist" aria-label="Asset type filter">
          {['all', 'image', 'video'].map(type => (
            <button
              key={type}
              role="tab"
              aria-pressed={typeFilter === type}
              onClick={() => onTypeFilterChange(type)}
              aria-label={`Filter by ${type}`}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row" role="group" aria-label="Sort By">
        <label style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>Sort</label>
        <div className="segmented">
          {['newest', 'oldest', 'name'].map(opt => (
            <button
              key={opt}
              aria-pressed={sortBy === opt}
              onClick={() => onSortByChange(opt)}
            >
              {opt[0].toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row">
        <label style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>Tags</label>
        <div className="tags" role="list">
          {allTags.length === 0 && (
            <div style={{ fontSize: 12, color: 'var(--color-text-dim)' }}>No tags yet</div>
          )}
          {allTags.map(tag => (
            <button
              key={tag}
              role="listitem"
              className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
              aria-pressed={selectedTags.includes(tag)}
              aria-label={`Toggle tag ${tag}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
