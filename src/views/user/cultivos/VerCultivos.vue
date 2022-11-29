<template>
    <div>
      <div
        class="d-flex justify-space-between mb-6 bg-surface-variant">


        <v-sheet class="ma-2 pa-2">
            <button @click="volverDashboard()">VOLVER</button>       
        </v-sheet>
        <v-sheet class="ma-2 pa-2">
          DATOS
        </v-sheet>
      </div>
    </div>
    <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Nombre
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
              </tr>
            </tbody>
          </v-table>
  </template>
  

<script>
      
import Navigation from '@/components/layouts/menus/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components: { Navigation },
        name: 'VerCultivos',
        data: () => ({
          userId: null,
          campoId: null,
          datosCampos:{},
          cultivos: []
        }),
        mounted(){

          this.userId=localStorage.getItem('userId');  
          this.campoId = this.$route.params.campoId;

          axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}`) //await antes
            .then((response) =>{

              if(response.statusText=="OK"){
                console.log("Exito consultar campos ");
                this.datosCampos = response.data;
              }else{
                console.log("Error haciendo login ");
              }

            }); 
            
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos`) //await antes
            .then((response) =>{

              if(response.statusText=="OK"){
                console.log("Exito consultar cultivos ");
                this.cultivos = response.data;
                console.log(response.data);
              }else{
                console.log("Error haciendo login ");
              }

            }); 
            // FIN MOUNTED
        },
 

        methods: {
            volverDashboard(){
                this.$router.push(`/user/dashboard`);
            }
        }
 
    }
  </script>