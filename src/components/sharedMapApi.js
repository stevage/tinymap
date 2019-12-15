const layer  = (window.location.search.match(/layer=([a-zA-Z0-9_-]+)/) || [])[1];
const key = (window.location.search.match(/secretkey=([a-zA-Z0-9_-]+)/) || [])[1];
const keyFragment = key ? `?key=${key}` : '';
console.log(layer);

export const getPointsUrl = `https://shared-map-api.glitch.me/layer/${layer}${keyFragment}`;
export const addPointUrl = `https://shared-map-api.glitch.me/layer/${layer}${keyFragment}`;
export const deletePointUrl = id => `https://shared-map-api.glitch.me/layer/${layer}/${id}${keyFragment}`;