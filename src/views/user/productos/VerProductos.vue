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
              xl="5" 
              class="my-10">
              <div class="ma-2 py-1 d-flex justify-space-between">
                <v-btn 
                  color="success" 
                  elevation="6"
                  @click="crearProducto()">Añadir Producto</v-btn>
              </div>
              
              <v-sheet class="ma-2 rounded" elevation="4">
                <v-table>
                  <thead>
                    <tr class="bg-green">
                      <th class="text-left">{{ nombre }}</th>
                      <th class="text-left">{{ cantidad }}</th>
                      <th class="text-left">Editar</th>
                      <th class="text-left">Borrar</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="item in productos"
                      :key="item._id" >
                      <td>{{ item.name }}</td>
                      <td>{{ item.cantidad }}</td>
                      <td>
                        <v-btn variant="flat" @click="editarProducto(item._id)">
                          <v-icon color="success">mdi-pencil</v-icon>
                        </v-btn>
                      </td>
                      <td>
                        <v-btn variant="flat" @click="eliminarProducto(item._id)">
                          <v-icon color="error">mdi-trash-can</v-icon>
                        </v-btn>
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
          productos: [],
          titulo:"PRODUCTOS",
          nombre:"Nombre producto",
          textButonActualizar:"Actualizar",
          cantidad:"Cantidad (Kg)"
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

            toggleOrder () {
              this.sortDesc = !this.sortDesc
            },
            nextSort () {
              let index = this.headers.findIndex(h => h.value === this.sortBy)
              index = (index + 1) % this.headers.length
              this.sortBy = this.headers[index].value
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