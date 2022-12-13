<template>
    <v-carousel show-arrows="hover" cycle
    height="800"
    hide-delimiter-background>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        cover
        reverse-transition="fade-transition"
        transition="fade-transition">

        <div class="d-flex fill-height justify-center align-center pa-16">
          <div class="text-h2 bg-whiteOp pa-16 ">
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
          description: 'Gestionar tu campo desde cualquier lado'
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
