<template lang="pug">
div.b--black.ba.pa2(v-show="feature")
    h3.f4 {{ p.name || '(Unnamed item)' }}
    p {{ p.description || '(No description)'}}
    button.tr.mv2.mr2.f6.link.dim.ph3.pv2.mb2.white.bg-purple.ml-auto.db(@click="clickDelete") 
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
import { deletePointUrl } from './sharedMapApi';
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
        }
    },
    created() {
        window.FeatureInfo = this;
        EventBus.$on('NewFeature-mode', mode => {
            console.log('moding');
            this.feature = undefined
        });
    },
    methods: {
        async clickDelete() {
            console.log('Deleting ', this.feature.id);
            await axios.delete(`${deletePointUrl(this.feature.id)}`);
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