<template>
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col
            xs="12"
            sm="12"
            md="6"
            lg="5"
            xl="4">
            <v-sheet class="pa-2 ma-2">
                <v-card
                        class="mx-auto"
                        color="green"
                        variant="outlined">
                        <v-card-title class="d-flex justify-space-end"><v-icon>mdi-account</v-icon><h3>Datos perfil</h3></v-card-title>
                        <v-card-text>
                        <h3 class="py-3">Bienvenido/a</h3>
                        <p>Nombre: {{ datosUser.name }}</p>
                        <p>Username: {{ datosUser.username }}</p>
                        <p>e-mail: {{ datosUser.email }}</p>
                        </v-card-text>
                    </v-card>
            </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            .v-col-auto
          </v-sheet>
        </v-col>
  
        <v-responsive width="100%"></v-responsive>
  
        <v-col>
          <v-sheet class="pa-2 ma-2">
            .v-col-auto
          </v-sheet>
        </v-col>
  
        <v-col>
          <v-sheet class="pa-2 ma-2">
            .v-col-auto
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>  
<script>

import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components: { Navigation },
        name: 'Dashboard',
        data: () => ({
          userId: null,
          datosUser:{},
          campos: []
        }),
        mounted(){

          this.userId=localStorage.getItem('userId');  
          this.campoId = this.$route.params.campoId;
                  
          //CONSULTAR CAMPOS USER
          axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`) 
            .then((response) =>{

              if(response.statusText=="OK"){
                
                console.log("Exito consultar datos usuario ");
                
                this.datosUser = response.data;
                
                console.log("response: ");
                console.log(response);

              }else{
                
                console.log("Error");
              }

            });          
            

            // FIN MOUNTED
        },
 

        methods: {

            editarPerfil(campoId){
              this.$router.push(`/user/${campoId}/editarCampo`);
            },
        }
 
    }
  </script>