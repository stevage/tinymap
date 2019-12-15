<template lang="pug">
    #app.flex.flex-column.vh-100.avenir
        #top.bb.b--gray.bg-washed-blue.h3.pa1
            img.logo.fl.mh2(src="butterfly.svg")
            h1.f1.ma1 
                | TinyMap
        #middle.flex.flex-auto
            #sidebar.br.b--light-gray.overflow-auto
                Settings
                FeatureInfo.pa2
                NewFeature.pa2
            #map-container.relative.flex-auto
                Map
                #overlay.absolute
        #bottom.bt.b--light-gray.flex-none.h3.lh-solid.pa1
            p.ma0
                b Disclaimer: 
                | Do not use this site for anything private or important. There is no security. Your data may be deleted without warning. Absolutely no warranty of any kind.
            p Created by 
                a(href="https://twitter.com/stevage1") Steve Bennett
                | .  
                a(href="https://github.com/stevage/tinymap") Source code on Github.
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

.logo {
    height: 50px;
}

</style>
