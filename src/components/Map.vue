<template lang="pug">
#map.absolute.absolute--fill
</template>

<script>
import mapboxgl from 'mapbox-gl';
import U from 'mapbox-gl-utils';
import axios from 'axios';

import { EventBus } from './EventBus';
import { getPointsUrl } from './sharedMapApi';
export default {
    data: () => ({
        points: {}
    }),
    async mounted() {
        // replace this Mapbox access token with your own
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJjazNmNGV5enAwMTF1M2tuejhtc2twcXo5In0.mLPrYIYJ2FiFZ3KMqVIj6w';
        const map = new mapboxgl.Map({
            container: 'map',
            center: [144.96, -37.81],
            zoom: 14,
            style: 'mapbox://styles/mapbox/light-v9',
        });
        U.init(map, mapboxgl);
        window.map = map;
        window.Map = this;

        this.points = (await axios.get(getPointsUrl)).data;
        map.U.addGeoJSON('points', this.points);
        map.U.addCircle('points-circles', 'points', {
            circleColor: 'hsl(330,100%,70%)',
            circleStrokeColor: 'hsl(330,100%,40%)',
            circleStrokeWidth: 3,
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
        
    },
}
import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<style scoped>
</style>