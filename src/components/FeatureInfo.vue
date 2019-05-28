<template lang="pug">
table#FeatureInfo(v-if="feature").bg-white.b--gray.ba.helvetica.ma1
    tr(v-for="(prop,value) in feature.properties")
        th {{ prop }}
        td {{ value }}
</template>

<script>
export default {
    name: "FeatureInfo",
    data: () => ({
        feature: undefined
    }),
    created() {
        window.FeatureInfo = this;
    }
}
</script>

<style scoped>

</style>