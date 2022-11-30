<template>

    <v-app-bar color="green">
       
        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>
        <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title><router-link :to= urlDashboard()>Dashboard</router-link></v-list-item-title>
                <v-list-item-title><router-link :to= urlCampos()>Campos</router-link></v-list-item-title>
                <v-list-item-title><router-link :to= urlProductos()>Productos</router-link></v-list-item-title>

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
      this.$router.push(`/`);
    },
    urlDashboard(){
      return "/user/dashboard";
    },
    urlCampos(){
      return `/user/campos`;
    },
    urlProductos(){
      return `/user/productos`;
    }
  }
}
</script>
