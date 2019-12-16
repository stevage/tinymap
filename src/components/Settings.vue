<template lang="pug">
#Settings.pa2.mb3.bg-light-blue
    template(v-if="layer")
        p.mb1 Anyone can view this map with this URL:
        input.db.f7.gray(v-model="readOnlyUrl" readonly=true)

    template(v-if="secretkey")
        p.mb1 Anyone can edit this map with this URL: 
        input.f7.gray(v-model="collaborationUrl" readonly=true)

    template(v-if="!layer && !secretkey")
        h4 Welcome to TinyMap. 
        p To create your own map, just choose these two parameters.
        label.b.f5.mb0 Layer
        p.dark-gray.f7.i.mv0 A unique string identifying your map.
        input#newlayer.f6.gray(v-model="newLayer" placeholder="awesome-cafes")

        label.b.f5.mt3.db SecretKey
        p.dark-gray.f7.i.mv0 Share this with anyone who should be able to edit.
        input#newkey.f7.gray(v-model="newSecretKey" placeholder="l4ttesNbr0wn1es")

        button.mv2.mr2.f6.link.dim.ph3.pv2.mb2.dib.white.bg-purple(@click="clickCreate") Create My Map
    template(v-else)
        p.lh-copy.f7.dark-gray Download as 
            a.underline.link.dim.black(:href="geoJSONUrl") GeoJSON
            |  or 
            a.underline.link.dim.black(:href="csvUrl") CSV
            | .

        button.mt4.mb2.mr2.f6.link.dim.ph3.pv2.dib.white.bg-blue(@click="clickNew") Start over with new map


</template>

<script>
import URI from 'urijs';
import { getPointsGeoJSONUrl, getPointsCsvUrl } from './sharedMapApi';
export default {
    name: "Settings",
    data: () => ({
        newLayer: '',
        newSecretKey: ''
    }),
    created() {
        window.Settings = this;
    },
    computed:{
        
        layer: () => (window.location.search.match(/layer=([a-zA-Z0-9_-]+)/) || [])[1],
        secretkey: () => (window.location.search.match(/secretkey=([a-zA-Z0-9_-]+)/) || [])[1],

        readOnlyUrl: () => new URI(window.location).removeQuery('secretkey').toString(),
        collaborationUrl: () => new URI(window.location).toString(),
        csvUrl: () => getPointsCsvUrl,
        geoJSONUrl: () => getPointsGeoJSONUrl,
    },
    methods: {
        clickCreate() {
            window.location.search = `?layer=${this.newLayer}&secretkey=${this.newSecretKey}`;
        },
        clickNew() {
            window.location.search = ``;

        }
    }
}
</script>

<style scoped>
input {
    width: calc(100% - 1em);
}

.collapsed #Settings {
    /* display: none; */
}

.collapsed #Settings * {
    /* display: none; */
}


/* #newLayer::placeholder */

</style>