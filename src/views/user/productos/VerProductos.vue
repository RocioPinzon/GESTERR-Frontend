<template>
  <Header/>
    <v-layout>
      <v-main>
        <v-container class="">
          <v-row justify="center">
            <v-col
              cols="4">
              <h2 class="text-center py-10">PRODUCTOS</h2>
            </v-col>
          </v-row>

          <v-row justify="space-between">
            <v-sheet class="ma-2 pa-2">
              <div class="my-3 d-flex justify-space-between">
                <v-btn 
                  color="success" 
                  elevation="6"
                  @click="crearProducto()">Añadir Producto</v-btn>
              </div>
              <div class="d-flex justify-space-between">
                <v-btn 
                  color="primary" 
                  elevation="6"
                  @click="volverDashboard()">Volver Dashboard</v-btn>
              </div>
              
            </v-sheet>
          </v-row>
          <v-row justify="center">
            <v-col
              cols="6">
              <v-sheet class="ma-2 pa-2">
                <v-table>
                  <thead>
                    <tr class="bg-green">
                      <th class="text-left">
                        Nombre producto
                      </th>
                      <th class="text-left">
                        Cantidad (Kg)
                      </th>
                      <th class="text-left">
                        Editar
                      </th>
                      <th class="text-left">
                        Borrar
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in productos"
                      :key="item._id" >
                      <td>{{ item.name }}</td>
                      <td>{{ item.cantidad }}</td>
                      <td>
                        <button @click="editarProducto(item._id)">
                          <v-icon  
                            color="success">mdi-pencil</v-icon>
                        </button>
                      </td>
                      <td>
                        <button @click="eliminarProducto(item._id)">
                          <v-icon   
                            color="error">mdi-trash-can</v-icon>
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
    components: { Navigation, Header },
        name: 'VerCultivos',
        data: () => ({
          userId: null,
          productos: []
        }),
        mounted(){
          this.comprobarUsuario();  
 
          this.cargarProductos(); 

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
            comprobarUsuario(){
              this.userId=localStorage.getItem('userId'); 
              if(!this.userId){
                this.$router.push(`/signin`);
              } 
            },

            cargarProductos(){

            //CONSULTAR PRODUCTOS USER  
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/productos`) 
                .then((response) =>{

                  if(response.statusText=="OK"){
                    console.log("Exito consultar productos ");
                    this.productos = response.data;

                  }else{
                    console.log("Error al consultar todos los productos. ");
                  }

                }); 
            },

            volverDashboard(){
              this.$router.push(`/user/dashboard`);
            },
            
            crearProducto(){
              this.$router.push(`/user/productos/crearProducto`);
            },

            editarProducto(productoId){
              this.$router.push(`/user/productos/${productoId}/editarProducto`);
            },

            async eliminarProducto(productoId){
              const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Si elimina, ya no podrá recuperar el producto.",
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
                  axios.delete(`${SERVER_URL_COMPROBADA}/${this.userId}/productos/${productoId}`) 
                    .then(async(responseDelete) =>{

                      if(responseDelete.statusText=="OK"){
                        Swal.fire(
                          'Eliminado!',
                          'Tu producto ha sido eliminado.',
                          'success'
                        )
                        this.cargarProductos();

                        console.log("Exito borrar productos");  
                        
                      }else if(result.dismiss === Swal.DismissReason.cancel){
                        Swal.fire(
                              'Cancelado',
                              'Your imaginary file is safe :)',
                              'error')
                      }else{
                        
                        console.log("Error borrando producto ");
                      }
                    });
            }
        }
    }
  </script>