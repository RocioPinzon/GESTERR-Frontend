<template>
    <v-app-bar color="green">
       
        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>
          <v-menu>
                
            
          </v-menu>
            <router-link :to= urlDashboard()><v-btn>Dashboard</v-btn></router-link>
            <router-link :to= urlCampos()><v-btn>Campos</v-btn></router-link>
            <router-link :to= urlProductos()><v-btn>Productos</v-btn></router-link>
        <v-btn icon>
          <v-icon @click="logout(item_id)">mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
      

  </template>

<script>

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

      
      this.userId= localStorage.removeItem('userId');
      
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
