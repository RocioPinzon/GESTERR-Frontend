<template>
    <v-app-bar shrink-on-scroll color="green">
       
        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>
            <a href="http://localhost:8080/user/dashboard" class="dashboard">Dashboard</a>
            <v-btn variant="outlined" @click="irListadoCampos(item_id)">Campos</v-btn>
        <v-menu
            open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn
                color="tonal"
                v-bind="props">
                LISTADOS INFORMACIÓN
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
              <v-btn block @click="irListadoCultivos(item_id)">Cultivos</v-btn> 
              </v-list-item>

              <v-list-item>
                <v-btn block @click="irListadoProductos(item_id)">Productos</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn
                color="tonal"
                v-bind="props">
                DATOS
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-btn @click="irPerfil()" block>Perfil</v-btn>
              </v-list-item>

              <v-list-item>
                <v-btn @click="logout(item_id)" block>Salir  
                  <v-icon class="px-2">mdi-export</v-icon>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu> 
             

        
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
      
      this.$router.push();

    },

    irPerfil(){
      this.$router.push("/user/perfil");
    },

    irListadoCampos(){
      this.$router.push(`/user/campos`);

    },
    irListadoCultivos(){
      this.$router.push(`/user/cultivos`);

    },
    irListadoProductos(){
      this.$router.push(`/user/productos`);

    }
  }
}
</script>
<style>

  .dashboard {
    color: rgb(255, 255, 255);
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 425;
    font-size:15px;
    padding: 0px 20px;

  }

</style>
