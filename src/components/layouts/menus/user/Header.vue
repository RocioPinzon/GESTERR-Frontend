<template>

    <v-app-bar color="green">
        <template v-slot:image>
          <v-img></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>
        <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title><router-link to="/user/dashboard">Dashboard</router-link></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        <v-btn icon>
          <v-icon @click="logout(item_id)">mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
      <Navigation/>

  </template>

<script>
import Navigation from './Navigation.vue'

export default {
  components: { Navigation },
  name: 'Header',

  data: () => ({
    items: [
      { title: 'Campos' },
      { title: 'Cultivos' },
      { title: 'Productos' }
    ]
  }),
  mounted(){

    this.userId=localStorage.getItem('userId'); 

  },
  methods:{
    logout(){
      localStorage.removeItem=('userId');
    }
  }
}
</script>
