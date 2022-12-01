<template>
  <Header/>
  <v-layout>
      <v-main>
        <v-container class="">
          <v-row justify="center">
            <v-col
              cols="4">
              <h2 class="text-center py-10">CAMPOS</h2>
            </v-col>
          </v-row>
         
          <v-row justify="space-between">
            <v-sheet class="ma-2 pa-2">
              <div class="my-3 d-flex justify-space-between">
                <v-btn 
                  color="success" 
                  elevation="6"
                  @click="agregarCampo()">Añadir campo</v-btn>
              </div>
              <div class="d-flex justify-space-between">
                <v-btn 
                  color="primary" 
                  elevation="6"
                  @click="volverDashboard()">Volver dashboard</v-btn>
              </div>
              
            </v-sheet>
          </v-row>
          <v-row justify="center">
            <v-col
              cols="6">

              <v-sheet class="ma-2 pa-2">
                <v-table class="elevation-2">
                  <thead>
                    <tr class="bg-green">
                      <th class="text-left">
                        Nombre
                      </th>
                      <th class="text-left">
                        Direccion
                      </th>
                      <th class="text-left">
                        Hectareas
                      </th>
                      <th class="text-left">
                        Ver cultivos de campo
                      </th>
                      <th class="text-left">
                        Modificar
                      </th>
                      <th class="text-left">
                        Eliminar
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in campos"
                      :key="item._id" >
                      <td>{{ item.name }}</td>
                      <td>{{ item.direccion }}</td>
                      <td>{{ item.hectareas }}</td>
                      <td>
                        <button @click="verCultivos(item._id)">
                          <v-icon
                            color="primary">
                            mdi-eye</v-icon>
                        </button>
                      </td>
                      <td>
                        <button @click="editarCampo(item._id)">
                          <v-icon
                            color="success">
                            mdi-pencil</v-icon>
                        </button>
                      </td>
                      <td>
                        <button @click="eliminarCampo(item._id)">
                          <v-icon 
                            color="error">
                            mdi-trash-can</v-icon>
                        </button>
                      </td>
                    </tr>
                    
                    </tbody>
                  </v-table>
                </v-sheet>
              </v-col>
            </v-row>         
        </v-container>
      </v-main>
    </v-layout>
</template>

<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components: { Navigation, Header},
        name: 'Dashboard',
        data: () => ({
          userId: null,
          datosUser:{},
          campos: []  
        }),
        mounted(){
          this.comprobarUsuario(); 
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
                
                console.log("Error ");
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
            volverDashboard(){
              this.$router.push(`/user/dashboard`);
            },
            verCultivos(campoId){
              this.$router.push(`/user/${campoId}/cultivos`);

            },
            editarCampo(campoId){
              this.$router.push(`/user/${campoId}/editarCampo`);
            },

            agregarCampo(){
              this.$router.push(`/user/crearCampo`);
                
            },

            async eliminarCampo(campoId){
             
              const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Si elimina, ya no podrá recuperar el campo.",
                icon: 'question',
                
                confirmButtonText: '¡Si, eliminar!',
                confirmButtonColor: '#679e1a',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#d33',
                reverseButtons: false
              });
              
              // Stop if user did not confirm
               if (!result.value) {
                  return;
               }

                  // DELETE           
                  axios.delete(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${campoId}`) 
                    .then(async(responseDelete) =>{

                      if(responseDelete.statusText=="OK"){
                        Swal.fire(
                          '¡Eliminado!',
                          'Tu campo ha sido eliminado.',
                          'success'
                        )
                        this.cargarCampos();
                        console.log("Exito borrar campos");  
                        
                        
                      }else if(result.dismiss === Swal.DismissReason.cancel){
                        Swal.fire(
                              'Cancelado',
                              'Your imaginary file is safe :)',
                              'error')
                      }else{
                        
                        console.log("Error borrando campo ");
                      }

                    });
                
            },
            comprobarUsuario(){
              this.userId=localStorage.getItem('userId'); 
              if(!this.userId){
                this.$router.push(`/signin`);
              } 
            }
        }
 
    }
  </script>