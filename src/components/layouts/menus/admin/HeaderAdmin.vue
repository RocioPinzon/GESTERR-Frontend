<template>

    <v-app-bar color="green">
       
        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>
          <v-menu>
            <router-link :to= urlPerfil()><v-btn>Perfil</v-btn></router-link>
            <router-link :to= urlUsers()><v-btn>Usuarios</v-btn></router-link>
          </v-menu>
        <v-btn @click="irPerfil(item_id)">Perfil</v-btn>
        <v-btn @click="irListadoUser(item_id)">Usuarios</v-btn>    
        <v-btn icon>
          <v-icon @click="logout(item_id)">mdi-export</v-icon>
        </v-btn>
      </v-app-bar>

  </template>
<script>

export default {
  components: {  },
  name: 'HeaderAdmin',

  data: () => ({
    
  }),
  
  mounted(){

    this.userId=localStorage.getItem('adminId'); 

  },
  methods:{
    logout(){

      
      this.userId= localStorage.removeItem('adminId');
      this.$router.push(`/`);
    },
    irPerfil(){
      this.$router.push(`/admin/dashboardAdmin`);

    },
    irListadoUser(){
      this.$router.push(`/admin/users`);

    }

  }
}
</script>
