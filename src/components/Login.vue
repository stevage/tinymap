<template lang="pug">
#Login
    div(v-if="!$auth.loading")
        div(v-if="$auth.isAuthenticated")
            img.w2.v-mid.ma2(:src="userPic" v-if="userPic")
            a.f6.grow.no-underline.br-pill.ba.bw2.ph3.pv2.mb2.dib.dark-blue.pointer(@click="logout") Log out
        div(v-else)
            a.f6.grow.no-underline.br-pill.ba.bw2.ph3.pv2.mb2.dib.dark-blue.pointer(@click="login") Login
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        
    }),
    created() {
        window.Login = this;
    },
    computed: {
        userPic() {
            return this.$auth.user && this.$auth.user.picture.replace(/^https:/, window.location.protocol);
        }
    },
    methods: {
      async login() {
        await this.$auth.loginWithRedirect();
        console.log(this.$auth.user);
      },
      logout() {
        this.$auth.logout({
          returnTo: window.location.origin
        })
      },
    }
}
</script>

<style scoped>

</style>