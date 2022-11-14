<template>
    <v-carousel show-arrows="hover" cycle
    height="500"
    hide-delimiter-background>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        cover
        reverse-transition="fade-transition"
        transition="fade-transition">

        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ item.title }}
            <br>
            {{ item.description }}
          </div>
        </div>

    </v-carousel-item>
    </v-carousel>
</template>
<script>
export default {
  name: 'Slider',
  data () {
    return {
      items: [
        {
          src: require('../../assets/img/slider1.jpg'),
          title: 'GesTerr',
          description: 'Una app cómoda para gestionar tu campo desde cualquier lado'
        },
        {
          src: require('../../assets/img/slider2.jpg'),
          title: 'Analiza',
          description: 'la productividad de tus cultivos'
        },
        {
          src: require('../../assets/img/slider3.jpg'),
          title: 'Genera informes',
          description: 'Optimiza tus productos y mejora el rendimiento'
        }
      ]
    }
  }
}
</script>
