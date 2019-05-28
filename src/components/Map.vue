<template lang="pug">
#map.absolute.absolute--fill
</template>

<script>
    import mapboxgl from 'mapbox-gl';
    import U from 'mapbox-gl-utils';
    
    export default {
        mounted() {
            mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw';
            const map = new mapboxgl.Map({
                container: 'map',
                center: [145, -37.8],
                zoom: 12,
                style: 'mapbox://styles/mapbox/light-v9',
            });
            U.init(map);
            window.map = map;
            window.Map = this;
            map.U.hoverPointer('place-suburb');
            map.on('click', 'place-suburb', e => {
                console.log(e);
                window.FeatureInfo.feature = e.features[0];
            });
            
        }
    }
    import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<style scoped>
</style>