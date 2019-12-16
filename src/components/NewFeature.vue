<template lang="pug">
#NewFeature.mt5(v-show="show")
    p(v-if="mode==='locating'") Click to locate the new item on the map.
    button.f6.link.dim.ph3.pv2.mb2.dib.white.bg-purple(@click="clickAdd" v-if="mode === ''") New item
    div.ba.pa2.b--mid-gray(v-if="mode === 'confirming'")
        label.f5.mb1.db Name
        input.input-reset(v-model="feature.properties.name")
        label.f5.mb1.mt3.db Description
        textarea.input-reset(v-model="feature.properties.description")
        br
        button.mv2.mr2.f6.link.dim.ph3.pv2.mb2.dib.white.bg-purple(@click="clickSave") Save
        button.f6.link.dim.ph3.pv2.mb2.dib.white.bg-gray(@click="clickCancel") Cancel
    button.f6.link.dim.ph3.pv2.mb2.dib.white.bg-gray(@click="clickCancel" v-if="mode === 'locating'") Cancel
</template>

<script>
import { EventBus } from './EventBus';
import { addFeatureUrl, updateFeatureUrl, layer, canEdit } from './sharedMapApi';
import axios from 'axios';

export default {
    name: "NewFeature",
    data: () => ({
        mode: '',
        feature: {},
    }),
    created() {
        window.NewFeature = this;
        EventBus.$on('Map-clickLocate', lngLat => {
            this.feature = {
                type: 'Feature',
                properties: {
                    name: '',
                    description: ''
                },
                geometry: {
                    type: 'Point',
                    coordinates: [lngLat.lng, lngLat.lat]
                },
            };
            this.mode = 'confirming'
        });
        EventBus.$on('edit-feature', feature => {
            const f = JSON.parse(JSON.stringify(feature));
            this.feature = {
                type: f.type,
                properties: f.properties,
                geometry: f.geometry,
                id: f.id
            };
            this.mode = 'confirming';
        });
    },
    computed: {
        show() {
            return canEdit();
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
            
            EventBus.$emit('NewFeature-save', this.feature);
            if (this.feature.id) {
                this.feature._id = this.feature.id;
                delete(this.feature.id);
                const success = (await axios.put(updateFeatureUrl(this.feature._id), this.feature)).data;
                if (success) {
                    EventBus.$emit('update-feature', this.feature);
                    console.log('updated', this.feature);
                } // else error?
            } else {
                const savedFeature = (await axios.post(addFeatureUrl, this.feature)).data[0]
                EventBus.$emit('NewFeature-saved', savedFeature);
                console.log('saved', savedFeature);
            }
        },
        
    },
    watch: {
        mode() {
            EventBus.$emit('NewFeature-mode', this.mode);
        }
    }
}
</script>

<style scoped>
input,textarea {
    width: calc(100% - 1em);
}

</style>