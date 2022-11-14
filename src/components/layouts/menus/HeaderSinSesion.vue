<template>

    <v-app-bar color="green1">

        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-menu>
            <template v-slot:activator>
              <!--<nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
              </nav>-->
              <v-btn variant="text"><router-link to="/">Inicio</router-link> </v-btn>
              <v-btn variant="text"><router-link to="/signin">Entrar</router-link></v-btn>
              <v-btn variant="text">Regístrate</v-btn>

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
