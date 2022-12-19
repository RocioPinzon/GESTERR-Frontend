<template>

    <v-app-bar shrink-on-scroll color="green">
       
        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>
            <a href="https://gesterr.herokuapp.com/user/dashboard" class="menuResp dashboard"><v-icon>mdi-home</v-icon></a>
            <v-btn class="menuResp"  @click="irListadoCampos(item_id)">Campos</v-btn>
            <!--<v-btn class="menuMobile"  @click="irListadoCampos(item_id)">Campos mobile</v-btn>-->
            
            <v-menu >
              <template v-slot:activator="{ props }">
                <v-btn class="menuMobile"
                  color="tonal"
                  v-bind="props">
                  MENU
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <a href="https://gesterr.herokuapp.com/user/dashboard" style="color:#4a4a4a" class="dashboard">Dashboard</a>
                </v-list-item>
                <v-list-item>
                  <v-btn block @click="irListadoCampos(item_id)">Campos</v-btn>
                </v-list-item>

                <v-list-item>
                <v-btn block @click="irListadoCultivos(item_id)">Cultivos</v-btn> 
                </v-list-item>

                <v-list-item>
                  <v-btn block @click="irListadoProductos(item_id)">Productos</v-btn>
                </v-list-item>
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
        
        
            <v-menu 
              open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn class="menuResp" 
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
                <v-btn class="menuResp" 
                  color="tonal"
                  v-bind="props"><v-icon>mdi-account</v-icon>
                  {{ datosUser.username }}
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
    import axios from 'axios';
    const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";


export default {
  components: { },
  name: 'Header',

  data: () => ({
    items: [
      { title: 'Campos' },
      { title: 'Cultivos' },
      { title: 'Productos' }
    ],
    datosUser:{}
  }),
  mounted(){

    this.userId=localStorage.getItem('userId'); 

    //CONSULTAR CAMPOS USER
          
    axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`) 
            .then((response) =>{

              if(response.statusText=="OK"){
                
                console.log("Exito consultar datos usuario "); 
                this.datosUser = response.data;
               
              }else{
                
                console.log("Error haciendo login ");
              }

            }); 

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

  @media only screen and (max-width: 768px) { 
    .menuResp { 
      display: none !important;
      } 
    }
    
    @media only screen and (min-width: 768px) { 
    .menuMobile { 
      display: none !important;
      } 
    }
</style>
