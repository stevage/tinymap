<template lang="pug">
    #app.flex.flex-column.vh-100.avenir
        #top.bb.b--gray.bg-washed-yellow.h3
            h1 Title
        #middle.flex.flex-auto
            #sidebar.br.b--light-gray.overflow-auto.w3.w5-ns
                .b.i Hello                
            #map-container.relative.flex-auto
                Map
                #overlay.absolute
                    FeatureInfo
        #bottom.bt.b--light-gray.flex-none.h2
</template>

<script>
import Map from './components/Map.vue'
import FeatureInfo from './components/FeatureInfo.vue'

export default {
    name: 'app',
    components: {
      Map,
      FeatureInfo
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

</style>
