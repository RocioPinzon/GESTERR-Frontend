<template>
    <v-app>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false">
          <v-list-item
            icon="mdi-menu mdi"
            title="John Leider"
            nav>
            
            <template v-slot:append32>
                <v-btn icon="mdi-heart"></v-btn>

                <v-btn icon="mdi-magnify"></v-btn>

                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
            
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Dashboard" value="dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Campos" value="campos"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Cultivos" value="cultivos"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-app>
  </template>

<script>
export default {
  name:Navigation,
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Inicio', icon: 'mdi-home-city' },
        { title: 'Campos', icon: 'mdi-account' },
        { title: 'Cultivos', icon: 'mdi-account-group-outline' },
      ],
      rail: true,
    }
  },
}
</script>