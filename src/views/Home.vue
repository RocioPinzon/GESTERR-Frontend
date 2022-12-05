<template>
  <HeaderSinSesion/>
    <v-content>

        <Slider/>

        <v-container class="text-center" width="800px">
            <Cards/>
        </v-container>
    </v-content>
</template>
<script>

import Cards from '../components/layouts/Cards.vue'
import Slider from '../components/layouts/Slider.vue'
import HeaderSinSesion from '../components/layouts/menus/HeaderSinSesion.vue';

export default {

  name: 'Home',
  components: {
    Cards,
    Slider,
    HeaderSinSesion
  },
  data: () => ({

  })
}

</script>
