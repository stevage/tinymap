export const layer  = (window.location.search.match(/layer=([a-zA-Z0-9_-]+)/) || [])[1];
export const secretkey = (window.location.search.match(/secretkey=([a-zA-Z0-9_-]+)/) || [])[1];

export const canEdit = () => !!secretkey;

const keyFragment = secretkey ? `?key=${secretkey}` : '';
console.log(layer);

export const getPointsUrl = `https://shared-map-api.glitch.me/layer/${layer}${keyFragment}`;
export const addFeatureUrl = `https://shared-map-api.glitch.me/layer/${layer}${keyFragment}`;

export const updateFeatureUrl = id => `https://shared-map-api.glitch.me/layer/${layer}/${id}${keyFragment}`;
export const deleteFeatureUrl = id => `https://shared-map-api.glitch.me/layer/${layer}/${id}${keyFragment}`;