<template lang="pug">
#FeatureInfo.ph2.pb3.b--black.ba.pa2.bg-white.ma2(v-show="feature")
    h3.f4 {{ p.name || '(Unnamed item)' }}
    p {{ p.description || '(No description)'}}
    button.tr.mv2.mr2.f7.link.dim.ph3.pv2.mb2.white.bg-purple.ml-auto(@click="clickEdit" v-show="canEdit()") 
        //- .icono-rename
        | Edit
    button.tr.mv2.mr2.f7.link.dim.ph3.pv2.mb2.white.bg-blue.ml-auto(@click="clickDelete" v-show="canEdit()") 
        //- .icono-cross
        | Delete

    //- img.image(v-if="imageUrl" :src="imageUrl")
    //- table#FeatureInfo(v-if="feature").bg-white.b--gray.ba.helvetica.ma1
    //-     tr(v-for="(value, prop) in feature.properties")
    //-         template(v-if="ignoreProps.indexOf(prop) === -1")
    //-             th.f6 {{ prop }}
    //-             td.f6 {{ value }}
    
</template>

<script>
import { EventBus } from './EventBus';
import { deleteFeature } from './sharedMapApi';
import { canEdit } from './sharedMapApi';
import axios from 'axios';
export default {
    name: "FeatureInfo",
    data: () => ({
        feature: undefined,
        ignoreProps: ['id','Longitude','Latitude', 'image_url']
    }),
    computed: {
        p() {
            return this.feature && this.feature.properties || {};
        },
        imageUrl() {
            return this.p.image_url || ''
        },
        
    },
    created() {
        window.FeatureInfo = this;
        EventBus.$on('NewFeature-mode', mode => {
            this.feature = undefined
        });
    },
    watch: {
        feature() {
            if (this.feature) {
                EventBus.$emit('select-feature', this.feature);
            }
        }
    },
    methods: {
        canEdit,
        async clickEdit() {
            console.log('Editing ', this.feature);
            EventBus.$emit('edit-feature', this.feature);
        },
        async clickDelete() {
            console.log('Deleting ', this.feature.id);
            await deleteFeature(this.feature);
            EventBus.$emit('delete-feature', this.feature.id);
            this.feature = undefined;
        }
    }
}
</script>

<style scoped>
#FeatureInfo th {
    text-align:  right;
}

.image {
    width: 100%;
}

</style>