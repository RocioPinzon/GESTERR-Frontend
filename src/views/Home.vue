<template>
  <HeaderSinSesion/>
    <v-content>

        <Slider/>

        <v-container class="text-center bg-white" width="800px">
            <Cards/>
        </v-container>
    </v-content>
    <Footer/>
</template>
<script>

import Cards from '../components/layouts/Cards.vue'
import Slider from '../components/layouts/Slider.vue'
import HeaderSinSesion from '../components/layouts/menus/HeaderSinSesion.vue';
import Footer from '@/components/layouts/footers/Footer.vue';

export default {

  name: 'Home',
  components: {
    Cards,
    Slider,
    HeaderSinSesion,
    Footer
  },
  data: () => ({

  })
}

</script>
