<template>
    <v-content>
        <Slider/>

        <v-container class="text-center" width="800px">
            <h2>Servicios</h2>
            <Servicios/>
        </v-container>
    </v-content>
</template>
<script>

import Servicios from '../components/layouts/Servicios.vue'
import Slider from '../components/layouts/Slider.vue'

export default {

  name: 'Home',
  components: {
    Servicios,
    Slider
  },
  data: () => ({

  })
}

</script>
