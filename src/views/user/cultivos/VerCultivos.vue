<template>
  <Header/>
    <v-layout>
      <v-main>
        <v-container class="">

          <v-row justify="center" class="d-flex align-center pa-10">
            <v-sheet class="ma-2 pa-2 align-self-end">
              <v-img
                src="../../../assets/img/fondo-titulos.png">
                <h2 class="text-center py-15">{{ titulo }}</h2>
              </v-img>
            </v-sheet>
          </v-row>

          <v-row justify="center">
            <v-col
              cols="12"
              sm="10"
              md="9"
              lg="7"
              xl="5">
                <div class="ma-2 py-1 d-flex justify-space-between">
                  <v-btn 
                  color="success" 
                  elevation="6"
                  @click="agregarCultivo()">Añadir Cultivo</v-btn>
              </div>
              <v-sheet class="ma-2 rounded" elevation="4">
                  <v-table>
                    <thead>
                      <tr class="bg-green">
                        <th class="text-left">{{ nombre }}</th>
                        <th class="text-left">{{ cantidad }}</th>
                        <th class="text-left">Producto de cultivo</th>
                        <th class="text-left">Editar</th>
                        <th class="text-left">Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in cultivos"
                        :key="item._id" >
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.cantidad }}</td>
                        <td>
                          <button variant="flat" @click="verProductos()">
                              <v-icon color="#8AA39B">mdi-eye</v-icon>
                          </button>
                        </td>
                        <td>
                          <button variant="flat" @click="editarCultivo(item._id)">
                            <v-icon color="success">mdi-pencil</v-icon>
                          </button>
                        </td>
                        <td>
                          <button variant="flat" @click="eliminarCultivo(item._id)">
                            <v-icon color="error">mdi-trash-can</v-icon>
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
    components: { Navigation,Header },
        name: 'VerCultivos',
        data: () => ({
          userId: null,
          campoId: null,
          datosUser:{},
          datosCultivo:{},
          cultivos: [],
          titulo:"CULTIVOS",
          cantidad:"Cantidad",
          nombre:"Nombre cultivos"
        }),
        mounted(){
          this.comprobarUsuario();   
          this.campoId = this.$route.params.campoId;

          this.cargarCultivos(); 

          axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`)
            .then((response) =>{

              if(response.statusText=="OK"){
                console.log("Exito consultar datos usuario ");
                this.datosUser = response.data;
                
              }else{
                console.log("Error");
              }
            });             
            // FIN MOUNTED
        },

        methods: {
          cargarCultivos(){

            //CONSULTAR CULTIVOS DE UN CAMPO  
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos`) 
                .then((response) =>{

                  if(response.statusText=="OK"){
                    console.log("Exito consultar cultivos ");
                    this.cultivos = response.data;

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
            verProductos(){
              this.$router.push(`/user/productos`);
            },
            async eliminarCultivo(cultivoId){
              
              const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Si elimina, ya no podrá recuperar el campo.",
                icon: 'question',
                
                confirmButtonColor: '#679e1a',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Si, eliminar!',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                reverseButtons: false
              });
              
              // Stop if user did not confirm
               if (!result.value) {
                  return;
               }

                  // DELETE           
                  axios.delete(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${cultivoId}`) 
                    .then(async(responseDelete) =>{

                      if(responseDelete.statusText=="OK"){
                        Swal.fire(
                          'Eliminado!',
                          'Tu campo ha sido eliminado.',
                          'success'
                        )
                        this.cargarCultivos();

                        console.log("Exito borrar campos");  
                        
                      }else if(result.dismiss === Swal.DismissReason.cancel){
                        Swal.fire(
                              'Cancelled',
                              'Your imaginary file is safe :)',
                              'error')
                      }else{
                        
                        console.log("Error borrando campo ");
                      }

                    });
                
            },
            editarCultivo(cultivoId){
              this.$router.push(`/user/${this.campoId}/cultivos/${cultivoId}/editarCultivo`);

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