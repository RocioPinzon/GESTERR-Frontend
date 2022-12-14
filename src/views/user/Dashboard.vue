<template>
  <Header/>
  
  <v-layout>
    <v-main>
      <v-container class="py-16">
        
        
        <v-row justify="center" class="d-flex" no-gutters>
          <v-col cols="12"
                  sm="12"
                  md="4"
                  lg="5"
                  xl="3"><CardUser/>
          </v-col>
          <v-col cols="12"
                  sm="12"
                  md="8"
                  lg="7"
                  xl="8" class="pa-4"><Tiempo/>
          </v-col>
          
        
          <v-responsive width="100%"></v-responsive>


        </v-row>
        <v-row class="justify-center" no-gutters>
          <CardDashboard/>

        </v-row>
      </v-container>
  </v-main>

</v-layout>
<FooterSinSesion/>
</template>

<script>

import Tiempo from '@/components/Tiempo';

import Header from '@/components/layouts/menus/user/Header.vue';
import FooterSinSesion from '@/components/layouts/footers/FooterSinSesion.vue';
import CardUser from '@/components/layouts/CardUser.vue'
import CardDatosDash from '@/components/layouts/CardDatosDash.vue'
import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import CardDashboard from '@/components/layouts/CardDashboard.vue'
import AlertDashboard from '@/components/layouts/AlertDashboard.vue'
import axios from 'axios';

//  Heroku   //
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components:   {
      Navigation,
      CardDashboard,
      CardUser,
      AlertDashboard,
      Header,
      CardDatosDash,
      Tiempo,
      FooterSinSesion
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

        created() {
            const reloaded = localStorage.getItem('reloaded');
            if (reloaded !== 'true') {
                localStorage.setItem('reloaded', 'true');
                location.reload();
            }
          },

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