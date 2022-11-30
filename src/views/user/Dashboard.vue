<template>
  <Header/>
  <v-layout>
    <v-main>
      <v-container class="">
        <v-row class="pa-4" no-gutters>
          <AlertDashboard/>

        </v-row>
        <v-row no-gutters>
          <CardUser/>
          
          <v-col>
            <v-sheet class="pa-2 ma-2">
              <v-card
                  class="mx-auto"
                  max-width="300">
                  <v-list density="compact">
                    <v-list-subheader>ACCIONES</v-list-subheader>

                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      :value="item"
                      active-color="primary">
                      <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                      </template>

                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
            </v-sheet>
          </v-col>

          <v-responsive width="100%"></v-responsive>

          <CardDashboard/>
        </v-row>
      </v-container>
  </v-main>

</v-layout>
</template>

<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import CardUser from '@/components/layouts/CardUser.vue'
import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import CardDashboard from '@/components/layouts/CardDashboard.vue'
import AlertDashboard from '@/components/layouts/AlertDashboard.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components:   {
      Navigation,
      CardDashboard,
      CardUser,
      AlertDashboard,
      Header
      },
        name: 'Dashboard',
        data: () => ({
          userId: null,
          datosUser:{},
          campos: [],
          items: [
          { text: 'Real-Time', icon: 'mdi-clock' },
          { text: 'Audience', icon: 'mdi-account' },
          { text: 'Conversions', icon: 'mdi-flag' },
        ],
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
                
                console.log("Error haciendo login ");
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
                  axios.delete(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${campoId}`) 
                    .then(async(responseDelete) =>{

                      if(responseDelete.statusText=="OK"){
                        swalWithBootstrapButtons.fire(
                          'Eliminado!',
                          'Tu campo ha sido eliminado.',
                          'success'
                        )
                        console.log("Exito borrar campos");  
                        this.cargarCampos();
                        
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
            comprobarUsuario(){
              this.userId=localStorage.getItem('userId'); 
              if(!this.userId){
                this.$router.push(`/signin`);
              } 
            }
        }
 
    }
  </script>