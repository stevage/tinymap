<template lang="pug">
    #app.flex.flex-column.vh-100.avenir
        #top.bb.b--gray.bg-lightest-blue.pa1
            img.logo.fl.mh2(src="butterfly.svg")
            h1.f1.ma1 
                | TinyMap
        #middle.flex.flex-auto
            #sidebar.br.b--light-gray.overflow-auto.shadow-4.z-1.bg-light-gray(:class="{ collapsed: !sidebarOpen}")
                #mobile-header.bg-lightest-blue.ma0.pa1
                    img.logo.f5.mh1.fl(src="butterfly.svg")
                    h1.f3.ma0 TinyMap

                Settings
                FeatureInfo.pa2
                NewFeature.pa2
            #sidebar-rim.relative.br.b--gray.bw2(v-show="!sidebarOpen"  style="width:20px" @click="sidebarOpen = true")
            #map-container.relative.flex-auto
                Map
                #sidebarToggle.absolute.bg-white.f3.br.bt.bb.br--right.br-100.b--magenta.bw1.magenta.pa1.pointer.grow.pa0(@click="toggleSidebar")
                  span(v-if="!sidebarOpen")
                    .icono-caretRight.ml0
                  span(v-if="sidebarOpen") 
                    .icono-caretLeft.ml0

                #overlay.absolute
        #bottom.bt.b--light-gray.flex-none.lh-solid.pa1.bg-washed-blue(v-show="sidebarOpen")
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
    },
    data: () => ({
      sidebarOpen: true
    }),
    watch: {
      sidebarOpen() {
        this.$nextTick(() => window.map.resize())
      }
    }, 
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      }
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

@media (min-width: 800px) {

    #sidebar {
        width: 20rem;
    }
    #mobile-header {
        display:none;
    }
}
@media only screen and (max-width: 800px) {
    #sidebar {
        width: 12rem;
    }
    #top {
        display:none;
    }
    #mobile-header .logo {
        height: 25px;
    }
    #bottom {
        font-size:75%;
    }

}

.logo {
    height: 50px;
}

#sidebar.collapsed {
  position: absolute;
  animation-duration: 0.5s;
  animation-name: slideout;
  pointer-events:none;
  animation-fill-mode: forwards;
}

#sidebarToggle:hover {
  background:hsl(333,100%,95%)
}

.collapsed * {
    display: none;
}

#sidebarToggle {
    margin-left:-4px;
}

</style>
