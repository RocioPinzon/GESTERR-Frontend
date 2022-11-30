<template>
  <v-app>
    <v-main class="">
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>

import Footer from './components/layouts/footers/Footer.vue'

export default {
  name: 'App',

  components:{
    Footer
  },
  data: () => ({
    
  }),
}
</script>
