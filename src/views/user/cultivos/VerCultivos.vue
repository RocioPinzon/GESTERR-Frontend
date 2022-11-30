<template>
  <Header/>
    <div>
      <div
        class="d-flex justify-space-between mb-6 bg-surface-variant">


        <v-sheet class="ma-2 pa-2">
          <v-btn @click="volverDashboard()">VOLVER</v-btn>   
        </v-sheet>
        <v-sheet class="ma-2 pa-2">
          DATOS
        </v-sheet>
        <v-sheet class="ma-2 pa-2">

        <div class="d-flex justify-space-between">
          <v-btn @click="agregarCultivo()">Añadir Cultivo</v-btn>
        </div>
        </v-sheet>
      </div>
    </div>
    <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Nombre cultivo
                </th>
                <th class="text-left">
                  Cantidad
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in cultivos"
                :key="item._id" >
                <td>{{ item.nombre }}</td>
                <td>{{ item.cantidad }}</td>
                <td>
                  <button @click="verProductos(item._id)">
                    <v-icon>mdi-eye</v-icon>
                  </button>
                </td>
                <td>
                  <button @click="editarCultivo(item._id)">
                    <v-icon class="red">mdi-pencil</v-icon>
                  </button>
                </td>
                <td>
                  <button @click="eliminarCultivo(item._id)">
                    <v-icon class="red">mdi-trash-can</v-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </v-table>
  </template>
  

<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components: { Navigation,Header },
        name: 'VerCultivos',
        data: () => ({
          userId: null,
          campoId: null,
          datosCultivo:{},
          cultivos: []
        }),
        mounted(){
          this.comprobarUsuario();   
          this.campoId = this.$route.params.campoId;
          this.cargarCultivos(); 

          axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`) //await antes
            .then((response) =>{

              if(response.statusText=="OK"){
                
                console.log("Exito consultar datos usuario ");
                
                this.datosUser = response.data;
                
                console.log("response: ");
                console.log(response);
                  
                
              }else{
                
                console.log("Error haciendo login ");
              }

            });             
            // FIN MOUNTED
        },
 

        methods: {
          cargarCultivos(){
              //CONSULTAR CAMPOS USER
              
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos`) //await antes
                .then((response) =>{

                  if(response.statusText=="OK"){
                    console.log("Exito consultar cultivos ");
                    this.cultivos = response.data;
                    console.log(response.data);
                  }else{
                    console.log("Error get cultivos  ");
                  }

                }); 
            },
            volverDashboard(){
              this.$router.push(`/user/dashboard`);
            },
            agregarCultivo(){
              this.$router.push(`/user/${this.campoId}/cultivos/crearCultivo`);
            },
            verProductos(cultivoId){
              this.$router.push(`/user/${this.campoId}/cultivos/${cultivoId}/productos`);
            },
            async eliminarCultivo(cultivoId){
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: '#4CB944',
                  cancelButton: '#F72C25'
                },
                buttonsStyling: false
              });
              const result = await swalWithBootstrapButtons.fire({
                title: 'Estás seguro?',
                text: "Si elimina, No podrá recuperar el archivo.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '¡Si, eliminar!',
                cancelButtonText: 'No, cancelar.',
                reverseButtons: true
              });
              
              // Stop if user did not confirm
               if (!result.value) {
                  return;
               }

                  // DELETE           
                  axios.delete(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${cultivoId}`) 
                    .then(async(responseDelete) =>{

                      if(responseDelete.statusText=="OK"){
                        swalWithBootstrapButtons.fire(
                          'Eliminado!',
                          'Tu campo ha sido eliminado.',
                          'success'
                        )
                        console.log("Exito borrar campos");  
                        this.cargarCultivos();
                        
                      }else if(result.dismiss === Swal.DismissReason.cancel){
                        swalWithBootstrapButtons.fire(
                              'Cancelled',
                              'Your imaginary file is safe :)',
                              'error')
                      }else{
                        
                        console.log("Error borrando campo ");
                      }

                    });
                
            },
            editarCultivo(){
              this.$router.push(`/user/${this.campoId}/cultivos/${this.cultivoId}/editarCultivo`);

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