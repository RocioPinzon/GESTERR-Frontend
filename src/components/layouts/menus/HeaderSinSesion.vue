<template>
    <v-app-bar color="green">

        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-menu>
            <template v-slot:activator>
              <v-btn to="/"><v-icon>mdi-home</v-icon></v-btn>
              <v-btn to="/signin">Entrar</v-btn>
              <v-btn to="/signup">Regístrate</v-btn> 
            </template>
          </v-menu>
      </v-app-bar>
  </template>

<script>

export default {
  name: 'HeaderSinSesion',

  data: () => ({

  })
}
</script>
