const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * PUBLIC_INTERFACE
 * AssetService provides methods to fetch, upload, update, and delete assets.
 * It is a placeholder service that simulates network operations.
 * Replace implementations with real API calls when backend is ready.
 */
export const AssetService = {
  async listAssets() {
    /** Returns a list of example assets */
    await delay(250);
    const now = Date.now();
    return [
      {
        id: 'ex-img-1',
        name: 'Ocean View',
        description: 'A calm ocean with sunrise',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=60',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=40',
        tags: ['ocean', 'sunrise', 'calm'],
        createdAt: new Date(now - 1000 * 60 * 60 * 24 * 4).toISOString(),
      },
      {
        id: 'ex-vid-1',
        name: 'Waves Clip',
        description: 'Short loop of waves',
        type: 'video',
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        tags: ['ocean', 'waves'],
        createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
      },
      {
        id: 'ex-img-2',
        name: 'Coral Reef',
        description: 'Colorful corals undersea',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=60',
        thumbnailUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=40',
        tags: ['reef', 'underwater', 'color'],
        createdAt: new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString(),
      },
    ];
  },

  async uploadAssets(files, meta) {
    /** Simulates upload and returns created asset entries */
    await delay(400);
    const created = files.map((f, idx) => {
      const type = f.type.startsWith('video/') ? 'video' : 'image';
      return {
        id: `${Date.now()}-${idx}`,
        name: f.name.replace(/\.[^/.]+$/, ''),
        description: meta?.description || '',
        type,
        url: URL.createObjectURL(f),
        thumbnailUrl: type === 'image' ? URL.createObjectURL(f) : undefined,
        tags: meta?.tags || [],
        createdAt: new Date().toISOString(),
      };
    });
    return created;
  },

  async updateAsset(id, updates) {
    /** Simulates successful update and returns merged asset */
    await delay(200);
    return { id, ...updates, updatedAt: new Date().toISOString() };
  },

  async deleteAsset(id) {
    /** Simulates deletion */
    await delay(150);
    return { id, deleted: true };
  },
};
