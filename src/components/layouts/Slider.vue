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

        <div class="d-flex fill-height d-flex flex-column justify-center align-center w-100" >
          <div class="bgSlider text-center pa-15">
            <h1 class="fontSlider text-center">{{ item.title }}</h1>
            <h2 class="text-center">{{ item.description }}</h2>
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
          title: 'Analiza tus cultivos',
          description: 'la productividad de tus cultivos'
        },
        {
          src: require('../../assets/img/slider3.jpg'),
          title: 'Genera gráficas',
          description: 'Optimiza tus productos y mejora el rendimiento'
        }
      ]
    }
  }
}
</script>
<style>

.bgSlider{
  background: #e6e6e6d6;
}

.fontSlider{
  font-size: 50px;
}

</style>