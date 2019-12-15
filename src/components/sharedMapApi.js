export const layer  = (window.location.search.match(/layer=([a-zA-Z0-9_-]+)/) || [])[1];
export const secretkey = (window.location.search.match(/secretkey=([a-zA-Z0-9_-]+)/) || [])[1];
const keyFragment = secretkey ? `?key=${secretkey}` : '';
console.log(layer);

export const getPointsUrl = `https://shared-map-api.glitch.me/layer/${layer}${keyFragment}`;
export const addPointUrl = `https://shared-map-api.glitch.me/layer/${layer}${keyFragment}`;
export const deletePointUrl = id => `https://shared-map-api.glitch.me/layer/${layer}/${id}${keyFragment}`;