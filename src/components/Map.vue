<template lang="pug">
#map.absolute.absolute--fill
</template>

<script>
import mapboxgl from 'mapbox-gl';
import U from 'mapbox-gl-utils';

import { EventBus } from './EventBus';
import { getFeatures, layer } from './sharedMapApi';
import boundingBox from 'geojson-bounding-box';
export default {
    data: () => ({
        points: undefined,
        selectedId: undefined
    }),
    async mounted() {
        // replace this Mapbox access token with your own
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJjazQ2dDMzemcwMnFqM2VvY21rZTJuazl0In0.niqCsX9iAJNdTM9NvdRZ7Q';
        const map = new mapboxgl.Map({
            container: 'map',
            center: [144.96, -37.81],
            zoom: 14,
            style: 'mapbox://styles/mapbox/light-v9',
        });
        U.init(map, mapboxgl);
        window.map = map;
        window.Map = this;

        map.U.onLoad(async () => {
            map.U.addGeoJSON('points');
            map.U.addCircle('points-circles', 'points', {
                circleColor: 'hsl(330,100%,70%)',
                circleStrokeColor: 'hsl(330,100%,40%)',
                // circleStrokeWidth: 3,
                circleStrokeWidth: ['case',
                    ['to-boolean', ["feature-state", "selected"]], 8,
                    3],

                circleRadius: { stops: [[10,3], [12, 10]] }
            });
            map.U.addSymbol('points-labels', 'points', {
                textField: '{name}',
                textColor: 'hsl(330,100%,30%)',
                textAnchor: 'left',
                textOffset: [1,0]
            });
            map.U.addGeoJSON('new-point');
            map.U.addCircle('new-point-circle', 'new-point', {
                circleColor: 'transparent',
                circleStrokeColor: 'hsl(120,80%,30%)',
                circleStrokeWidth: 5,
                circleRadius: { stops: [[10,3], [12, 10]] }
            });
            
            map.U.hoverPointer('points-circles');
            map.on('click', 'points-circles', e => {
                if (NewFeature.mode === '') {
                    console.log(e);
                    window.FeatureInfo.feature = e.features[0];
                }
            });
            map.on('click', e => {
                if (window.NewFeature.mode === 'locating') {
                    EventBus.$emit('Map-clickLocate', e.lngLat);
                    map.U.setData('new-point', {
                        type: 'Point',
                        coordinates: [e.lngLat.lng, e.lngLat.lat]
                    });
                }
            });

            EventBus.$on('NewFeature-mode', mode => {
                if (mode === 'locating') {
                    map.getCanvas().style.cursor = 'crosshair'

                } else if (mode === '') {
                    map.getCanvas().style.cursor = ''

                    map.U.setData('new-point', { type: 'FeatureCollection', features: []});
                } else {
                    map.getCanvas().style.cursor = ''
                }
            });
            EventBus.$on('NewFeature-saved', newFeature => {
                this.points.features.push(newFeature);
                map.U.setData('points', this.points);
            });
            EventBus.$on('delete-feature', id => {
                this.points.features = this.points.features.filter(f => f.id !== id);
                map.U.setData('points', this.points);
            });        
            EventBus.$on('update-feature', feature => {
                Object.assign(this.points.features.find(f => f.id === feature._id), feature);
                map.U.setData('points', this.points);
            });        
            EventBus.$on('select-feature', feature => {
                if (this.selectedId) {
                    map.setFeatureState({ source: 'points', id: this.selectedId }, { selected: false });
                }
                this.selectedId = feature.id;

                map.setFeatureState({ source: 'points', id: feature.id }, { selected: true });
            });        

            if (layer) {
                this.points = await getFeatures();

                if (this.points) {
                    map.fitBounds(boundingBox(this.points), { padding: 60 });
                }
                map.U.setData('points', this.points);
            }
        });

    },
}
import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<style scoped>
</style>