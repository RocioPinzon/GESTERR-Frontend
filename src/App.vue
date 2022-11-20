<template>
  <v-app>
    <HeaderSinSesion/>
    <v-main class="">
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>

import HeaderSinSesion from './components/layouts/menus/HeaderSinSesion.vue'
import Footer from './components/layouts/footers/Footer.vue'

export default {
  name: 'App',

  components:{
    Footer,
    HeaderSinSesion
  },
  data: () => ({
    //
  })
}
</script>
