<template lang="pug">
    #app.flex.flex-column.vh-100.avenir
        #top.bb.b--gray.bg-washed-blue.h3
            h1 Shared Map Experiment
        #middle.flex.flex-auto
            #sidebar.br.b--light-gray.overflow-auto
                Settings
                FeatureInfo.pa2
                NewFeature.pa2
            #map-container.relative.flex-auto
                Map
                #overlay.absolute
        #bottom.bt.b--light-gray.flex-none.h2
</template>

<script>
import Map from './components/Map.vue'
import FeatureInfo from './components/FeatureInfo.vue'
import NewFeature from './components/NewFeature.vue'
import Settings from './components/Settings.vue'
export default {
    name: 'app',
    components: {
      Map,
      FeatureInfo,
      NewFeature,
      Settings
    }
}

require('tachyons/css/tachyons.min.css');
</script>

<style>
html, body {
  height: 100vh;
  width: 100%;
  margin:0;
  padding:0;
}

#sidebar {
    width: 20rem;
}


</style>
