<template lang="pug">
#NewFeature.mt5(v-show="show")
    p(v-if="mode==='locating'") Click to locate the new item on the map.
    button.f6.link.dim.ph3.pv2.mb2.dib.white.bg-purple(@click="clickAdd" v-if="mode === ''") New item
    div.ba.pa2.b--mid-gray(v-if="mode === 'confirming'")
        label.f5.mb1.db Name
        input.input-reset(v-model="name")
        label.f5.mb1.mt3.db Description
        textarea.input-reset(v-model="description")
        br
        button.mv2.mr2.f6.link.dim.ph3.pv2.mb2.dib.white.bg-purple(@click="clickSave") Save
        button.f6.link.dim.ph3.pv2.mb2.dib.white.bg-gray(@click="clickCancel") Cancel


    button.f6.link.dim.ph3.pv2.mb2.dib.white.bg-gray(@click="clickCancel" v-if="mode === 'locating'") Cancel
</template>

<script>
import { EventBus } from './EventBus';
import { addPointUrl, layer } from './sharedMapApi';
import axios from 'axios';

export default {
    name: "NewFeature",
    data: () => ({
        mode: '',
        name: '',
        description: '',
        coordinates: []
    }),
    created() {
        window.NewFeature = this;
        EventBus.$on('Map-clickLocate', lngLat => {
            console.log(lngLat);
            this.mode = 'confirming'
            this.coordinates = [lngLat.lng, lngLat.lat];
        });
    },
    computed: {
        show() {
            return !!layer;
        }
    },
    methods: {
        clickAdd() {
            this.mode = 'locating';
        },
        clickCancel() {
            this.mode = '';
        },
        async clickSave() {
            this.mode = '';
            const newFeature = {
                type: 'Feature',
                properties: {
                    name: this.name,
                    description: this.description
                },
                geometry: {
                    type: 'Point',
                    coordinates: this.coordinates.slice()
                }
            };
            EventBus.$emit('NewFeature-save', newFeature);
            const savedFeature = (await axios.post(addPointUrl,newFeature)).data[0]
            EventBus.$emit('NewFeature-saved', savedFeature);
            console.log('saved', savedFeature);

        },
    },
    watch: {
        mode() {
            EventBus.$emit('NewFeature-mode', this.mode);
            if (this.mode === 'locating') {

            }
        }
    }
}
</script>

<style scoped>
input,textarea {
    width: calc(100% - 1em);
}

</style>