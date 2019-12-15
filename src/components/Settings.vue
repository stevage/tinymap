<template lang="pug">
#Settings.pa2.mb3.bg-light-blue
    p.mb1 Anyone can view this map with this URL:
    input.db.f7.gray(v-model="readOnlyUrl" readonly=true)

    div(v-if="key")
        p.mb1 Anyone can edit this map with this URL: 
        input.f7.gray(v-model="collaborationUrl" readonly=true)

    p To create your own map, add your own 
        code layer= 
        | and 
        code secretkey= 
        | parameters.

</template>

<script>
import URI from 'urijs';
export default {
    name: "Settings",
    data: () => ({
        
    }),
    created() {
        window.Settings = this;
    },
    computed:{
        
        layer: () => (window.location.search.match(/layer=([a-zA-Z0-9_-]+)/) || [])[1],
        key: () => (window.location.search.match(/secretkey=([a-zA-Z0-9_-]+)/) || [])[1],

        readOnlyUrl: () => new URI(window.location).removeQuery('key').toString(),
        collaborationUrl: () => new URI(window.location).toString()
    }
}
</script>

<style scoped>
input {
    width: calc(100% - 1em);
}

</style>