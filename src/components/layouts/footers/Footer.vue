<template>
    <v-footer class="bg-brown text-center d-flex flex-column">

      <div>
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
    links: [
      'Inicio',
      'Servicios'
    ],
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  })
}
</script>
