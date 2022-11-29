<template>
  <v-app>
    <HeaderSinSesion v-if="!logueado"/>
    <Header v-if="logueado"/>

    <v-main class="">
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/layouts/menus/Header.vue'
import HeaderSinSesion from './components/layouts/menus/HeaderSinSesion.vue'
import Footer from './components/layouts/footers/Footer.vue'

export default {
  name: 'App',

  components:{
    Footer,
    HeaderSinSesion,
    Header
  },
  data: () => ({
    logueado:false
  }),
  mounted(){
    this.logueado=localStorage.getItem('userId')!=undefined;
    
  }


}
</script>
