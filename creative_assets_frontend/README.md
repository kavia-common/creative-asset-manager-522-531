# Creative Assets Frontend (Ocean Professional)

A lightweight React application for uploading, managing, and browsing creative assets (images/videos), styled with the Ocean Professional theme.

## Features

- Sidebar navigation, asset grid/gallery, filters sidebar
- Upload and Edit modals with accessible, responsive design
- Ocean Professional styling: blue primary, amber accents, rounded corners, subtle shadows, smooth transitions
- Service layer ready for backend/database integration (stubs in `src/services/api.js`)
- Push to Meta Ads Manager (simulated): from each asset card via "Push to Meta"

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

## Meta Ads Manager Integration

A "Push to Meta" button is available on each asset card. The current implementation simulates the push in the browser and checks for the presence of the following environment variables:

- `REACT_APP_META_APP_ID`
- `REACT_APP_META_ACCESS_TOKEN`
- `REACT_APP_META_AD_ACCOUNT_ID`

Copy `.env.example` to `.env` and fill in your values to enable simulation:

```
cp .env.example .env
```

Important:
- Do not call the Meta Graph API directly from the browser in production. Implement a backend endpoint (e.g., `POST /integrations/meta/push`) and move the logic there. Then update `src/services/meta.js` to call your backend (see comments in file).

## Integrating Backend

Replace methods in `src/services/api.js` with real API calls to your backend:
- `listAssets()` GET /assets
- `uploadAssets(files, meta)` POST /assets (multipart)
- `updateAsset(id, updates)` PATCH /assets/:id
- `deleteAsset(id)` DELETE /assets/:id

For Meta:
- Create a backend endpoint that accepts the prepared payload from `prepareAssetPayload()` and performs the authenticated calls to Meta Graph API using server-side credentials.
- Never expose sensitive tokens in the frontend.
