<template>
   <v-img
            src="../../../assets/img/flores-rojas.png"
            height="500"
            class=" text-white "></v-img>
    <v-footer class="bg-brown my-n16 text-center d-flex flex-column">
      <div>
        
      </div>
      <div class="py-10">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4"
          :icon="icon" variant="text"></v-btn>
      </div>

      <v-divider></v-divider>

      <div class="text-center">
        Todos los derechos reservados {{ new Date().getFullYear() }} — <strong>GesTerr</strong>
      </div>

    </v-footer>
  </template>

<script>
export default {
  name: 'Footer',

  data: () => ({
    
  })
}
</script>
