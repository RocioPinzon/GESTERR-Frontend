<template>
    <v-content>
        <Slider/>

        <v-container class="text-center" width="800px">
            <h2>Servicios</h2>
            <Cards/>
        </v-container>
    </v-content>
</template>
<script>

import Cards from '../components/layouts/Cards.vue'
import Slider from '../components/layouts/Slider.vue'

export default {

  name: 'Home',
  components: {
    Cards,
    Slider
  },
  data: () => ({

  })
}

</script>
