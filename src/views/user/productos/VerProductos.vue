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
                  Nombre producto
                </th>
               
                
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in productos"
                :key="item._id" >
                <td>{{ item.name }}</td>
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
    components: { Navigation, Header },
        name: 'VerCultivos',
        data: () => ({
          userId: null,
          productos: []
        }),
        mounted(){
          this.comprobarUsuario();  
 
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/productos`) 
            .then((response) =>{

              if(response.statusText=="OK"){
                console.log("Exito consultar productos ");
                this.productos = response.data;
              
              }else{
                console.log("Error ");
              }

            }); 
            // FIN MOUNTED
        },
 

        methods: {
            volverDashboard(){
              this.$router.push(`/user/dashboard`);
            },
            agregarProducto(){
              //this.$router.push(`/user/${this.campoId}/cultivos`);
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