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
                    <v-card-title class="d-flex justify-space-end"><v-icon>mdi-account</v-icon><h3>Datos perfil</h3></v-card-title>
                    <v-card-text>
                        <h3 class="py-3">Bienvenido/a</h3>
                        <p>Nombre: {{ datosUser.name }}</p>
                        <p>Username: {{ datosUser.username }}</p>
                        <p>e-mail: {{ datosUser.email }}</p>
                    </v-card-text>
                    
                    <v-card-actions class="d-flex flex-column">
                        <v-btn color="success"
                        variant="flat"
                        @click="irPerfil()">
                        {{ button }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-sheet>
    </v-col>
</template>


<script>
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";

    export default {
        name: 'Dashboard',
        data: () => ({
          userId: null,
          datosUser:{},
          button: "Ir a Perfil"
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