<template> 
    <v-layout>
      <Navigation/>
      <Header/>
      <v-main>
        <div
          class="d-flex flex-column mb-6 ">
          <v-sheet class="ma-2 pa-2">
            <v-row justify="center">
              <v-col
                cols="4">
                <v-sheet class="pa-2 ma-2">
                  <v-card
                    class="mx-auto"
                    width="400"
                    color="green"
                    variant="outlined">
                    <v-card-title class="d-flex justify-space-end"><v-icon>mdi-account</v-icon><h3>Datos perfil</h3></v-card-title>
                    <v-card-text>
                      <h3 class="py-3">Bienvenido/a</h3>
                      <p>Nombre: {{ datosUser.name }}</p>
                      <p>Username: {{ datosUser.username }}</p>
                      <p>e-mail: {{ datosUser.email }}</p>
                    </v-card-text>
                  </v-card>
                </v-sheet>
              </v-col>
              <v-col
                cols="4">
                <v-sheet class="pa-2 ma-2">
                  <v-card
                    class="mx-auto"
                    width="400"
                    prepend-icon="mdi-home">
                      
                    <v-card-text>
                      {{ datosUser.name }}
                      {{ datosUser.email }}

                    </v-card-text>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
        </v-sheet>
        <v-sheet class="ma-2 pa-2">

        <div class="d-flex justify-space-between">
          <v-btn @click="agregarCampo()">Añadir campo</v-btn>
        </div>
      </v-sheet>
        <v-sheet class="ma-2 pa-2">
          <v-table class="elevation-1">
            <thead class="green ">
              <tr>
                <th class="text-left">
                  Nombre
                </th>
                <th class="text-left">
                  Direccion
                </th>
                <th class="text-left">
                  Hectareas
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
                    <v-icon>mdi-eye</v-icon>
                  </button>
                </td>
                <td>
                  <button @click="editarCampo(item._id)">
                    <v-icon class="red">mdi-pencil</v-icon>
                  </button>
                </td>
                <td>
                  <button @click="eliminarCampo(item._id)">
                    <v-icon class="red">mdi-trash-can</v-icon>
                  </button>
                </td>
              </tr>
              
            </tbody>
          </v-table>
        </v-sheet>
        </div>
        
        
     
      </v-main>
    </v-layout>
</template>

<script>
      
import Navigation from '@/components/layouts/menus/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');


    export default {
    components: { Navigation },
        name: 'Dashboard',
        data: () => ({
          userId: null,
          datosUser:{},
          campos: []
        }),
        mounted(){

          this.userId=localStorage.getItem('userId');  
          this.campoId = this.$route.params.campoId;
          
          this.cargarCampos();  
          
          //CONSULTAR CAMPOS USER
          
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
                
            }
        }
 
    }
  </script>