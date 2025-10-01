//
// PUBLIC_INTERFACE
// MetaAdsService provides methods to prepare asset payloads and push them to Meta Ads Manager.
// This is a frontend placeholder that simulates the operation. Replace with real API calls to your backend.
// Environment variables (to be provided via .env):
//   REACT_APP_META_APP_ID
//   REACT_APP_META_ACCESS_TOKEN
//   REACT_APP_META_AD_ACCOUNT_ID
//
// SECURITY NOTE:
// Do not call Meta Graph API directly from the browser in production. Route through your backend.
//
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * PUBLIC_INTERFACE
 * prepareAssetPayload
 * Given a local asset model, prepare a minimal payload appropriate for Meta creative upload workflows.
 * @param {object} asset - Local asset object {id, name, description, type, url, thumbnailUrl, tags}
 * @returns {object} payload
 */
export function prepareAssetPayload(asset) {
  /** This maps local asset fields to a generic creative payload.
   * Real integration will differ based on target endpoints:
   * - For images: use ad image upload or creative with object_story_spec
   * - For videos: use video upload workflow
   */
  const isImage = asset.type === 'image';
  return {
    external_id: asset.id,
    name: asset.name,
    description: asset.description || '',
    tags: asset.tags || [],
    type: isImage ? 'IMAGE' : 'VIDEO',
    sourceUrl: asset.url, // In production, this should be a stable, publicly accessible URL
    thumbnailUrl: asset.thumbnailUrl || null,
  };
}

/**
 * PUBLIC_INTERFACE
 * pushToMeta
 * Simulates pushing an asset to Meta Ads Manager. Validates that required env variables are present.
 * Replace with a backend call that performs the real Graph API upload.
 * @param {object} payload - Prepared payload from prepareAssetPayload
 * @returns {{success: boolean, id?: string, message: string}}
 */
export async function pushToMeta(payload) {
  // Validate config (from .env). In CRA, variables must be prefixed with REACT_APP_
  const appId = process.env.REACT_APP_META_APP_ID;
  const token = process.env.REACT_APP_META_ACCESS_TOKEN;
  const adAccountId = process.env.REACT_APP_META_AD_ACCOUNT_ID;

  if (!appId || !token || !adAccountId) {
    return {
      success: false,
      message:
        'Meta credentials missing. Please set REACT_APP_META_APP_ID, REACT_APP_META_ACCESS_TOKEN, and REACT_APP_META_AD_ACCOUNT_ID in your environment.',
    };
  }

  // Simulate network delay and "success"
  await delay(600);

  // In a real implementation, call your backend endpoint:
  // await fetch(`${process.env.REACT_APP_API_BASE}/integrations/meta/push`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ payload }) })
  //  .then(r => r.json());

  return {
    success: true,
    id: `meta_${payload.external_id}`,
    message: 'Asset pushed to Meta Ads Manager (simulated).',
  };
}
