<template>
   <v-img
            src="../../../assets/img/flores-rojas.png"
           
            class="imgFooterResponsive text-white" style="object-fit: cover;"></v-img>
      <v-footer class="bg-brown text-center d-flex flex-column">
      
      <div class="py-10">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4"
          :icon="icon" variant="text"></v-btn>
      </div>

      

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