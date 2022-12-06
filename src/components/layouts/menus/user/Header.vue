<template>
    <v-app-bar color="green">
       
        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>
          <v-menu></v-menu>

            <v-btn @click="irDashboard()">Dashboard</v-btn>
            <v-btn @click="irPerfil()">Perfil</v-btn>
            <v-btn @click="irListadoCampos(item_id)">Campos</v-btn> 
            <v-btn @click="irListadoProductos(item_id)">Productos</v-btn> 

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
    irDashboard(){
      this.$router.push(`/user/dashboard`);

    },

    irPerfil(){
      this.$router.push("/user/perfil");
    },

    irListadoCampos(){
      this.$router.push(`/user/campos`);

    },
    irListadoProductos(){
      this.$router.push(`/user/productos`);

    }
  }
}
</script>
