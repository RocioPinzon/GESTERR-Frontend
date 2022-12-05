<template>
    <v-col
        xs="12"
        sm="12"
        md="5"
        lg="5"
        xl="3">
            <v-sheet class="pa-2 ma-2">
                <v-card
                    class="mx-auto"
                    color="green"
                    variant="outlined"
                    closable>
                    <v-card-title class="d-flex justify-space-end"><v-icon>mdi-account</v-icon><h3>DATOS</h3></v-card-title>
                    <v-card-text>
                        <h3 class="py-3">Tiempo y Fecha Actual</h3>
                        <p>Hora:  {{ new Date().getHours() }}:  {{ new Date().getUTCMinutes() }} :  {{ new Date().getSeconds() }}</p>
                        <p>Tiempo provincia:</p>
                        
                    </v-card-text>
                    
                </v-card>
                
            </v-sheet>
    </v-col>
</template>


<script>
import Tiempo from '@/components/Tiempo';

import axios from 'axios';
//  Local   //
//onst SERVER_URL_COMPROBADA = "http://localhost:3000/user";
//  Heroku   //
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";

    export default  {
        name: 'Dashboard',
        components:{Tiempo},
        data: () => ({
          userId: null,
          datosUser:{},
          campos:[],
        }),
        mounted(){

            this.userId=localStorage.getItem('userId');  
            this.campoId = this.$route.params.campoId;

            this.cargarCampos();  
            
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

            cargarCampos(){
              //CONSULTAR CAMPOS USER
              axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos`)
                            .then((response) =>{

                              if(response.statusText=="OK"){
                                console.log("Exito consultar campos ");
                                this.campos = response.data;
                                this.campos=response.data.provincia;
                              }else{
                                console.log("Error haciendo login ");
                              }
                        });
            },   
            irPerfil(){
                this.$router.push(`/user/perfil`);
            }          
        }   
}
  </script>