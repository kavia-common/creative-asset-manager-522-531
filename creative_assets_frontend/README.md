# Creative Assets Frontend (Ocean Professional)

A lightweight React application for uploading, managing, and browsing creative assets (images/videos), styled with the Ocean Professional theme.

## Features

- Sidebar navigation, asset grid/gallery, filters sidebar
- Upload and Edit modals with accessible, responsive design
- Ocean Professional styling: blue primary, amber accents, rounded corners, subtle shadows, smooth transitions
- Service layer ready for backend/database integration (stubs in `src/services/api.js`)

## Getting Started

In the project directory:

### `npm start`
Start the app at http://localhost:3000

### `npm test`
Run tests

### `npm run build`
Build for production

## Theme

Key theme tokens (see `src/App.css`):

- primary: `#2563EB`
- secondary/success: `#F59E0B`
- error: `#EF4444`
- background: `#f9fafb`
- surface: `#ffffff`
- text: `#111827`

## Integrating Backend

Replace methods in `src/services/api.js` with real API calls to your backend:
- `listAssets()` GET /assets
- `uploadAssets(files, meta)` POST /assets (multipart)
- `updateAsset(id, updates)` PATCH /assets/:id
- `deleteAsset(id)` DELETE /assets/:id

No environment variables are required by default. If needed, add them via `.env` and consume within the service layer.
