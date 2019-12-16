import axios from 'axios';
export const layer  = (window.location.search.match(/layer=([a-zA-Z0-9_-]+)/) || [])[1];
export const secretkey = (window.location.search.match(/secretkey=([a-zA-Z0-9_-]+)/) || [])[1];

export const canEdit = () => !!secretkey;

const keyFragment = secretkey ? `?key=${secretkey}` : '';
console.log(layer);

export const getPointsUrl = `https://shared-map-api.glitch.me/layer/${layer}${keyFragment}`;
export const getPointsGeoJSONUrl = `https://shared-map-api.glitch.me/layer/${layer}.geojson`;
export const getPointsCsvUrl = `https://shared-map-api.glitch.me/layer/${layer}.csv`;
export const addFeatureUrl = `https://shared-map-api.glitch.me/layer/${layer}${keyFragment}`;

export const updateFeatureUrl = id => `https://shared-map-api.glitch.me/layer/${layer}/${id}${keyFragment}`;
export const deleteFeatureUrl = id => `https://shared-map-api.glitch.me/layer/${layer}/${id}${keyFragment}`;

export async function saveFeature(feature) {
    return (await axios.post(addFeatureUrl, feature)).data;
}

export async function updateFeature(feature) {
    return (await axios.put(updateFeatureUrl(feature._id), feature)).data
}

export async function getFeatures() {
    return (await axios.get(getPointsUrl)).data;
}

export async function deleteFeature(feature) {
    return (await axios.delete(`${deleteFeatureUrl(feature.id)}`));
}