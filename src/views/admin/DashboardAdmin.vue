<template> 
<HeaderAdmin/>
    <v-layout>
      <v-main>
        <v-container class="">
          <v-row class="d-flex justify-center" no-gutters>
            <h2 class="pa-10 text-center">DASHBOARD ADMIN</h2>
          </v-row>
          <v-row no-gutters>
            <v-col
                xs="12"
                sm="12"
                md="6"
                lg="5"
                xl="4">
                <v-sheet class="pa-5 ma-2">
                    <v-card
                            class="mx-auto"
                            color="green"
                            variant="outlined">
                            <v-card-title class="d-flex justify-space-end"><v-icon>mdi-account</v-icon><h3>Datos perfil</h3></v-card-title>
                            <v-card-text>
                            <h3 class="py-3">Bienvenido/a</h3>
                            <p>Nombre: {{ datosUser.name }}</p>
                            <p>Apellidos: {{ datosUser.apellidos }}</p>
                            <p>Username: {{ datosUser.username }}</p>
                            <p>e-mail: {{ datosUser.email }}</p>
                            </v-card-text>
                        </v-card>
                </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="pa-5 ma-2">
                <v-form
                  ref="form"
                  class="elevation-5 pa-6"
                  v-model="valid"
                  lazy-validation>
                  <h2 class="text-center pa-6">EDITAR MIS DATOS PERSONALES</h2>

                  <v-text-field
                    v-model="datosUser.name"
                    :counter="10"
                    :rules="nameRules"
                    label="Nombre"
                    variant="outlined"></v-text-field>

                  <v-text-field
                    v-model="datosUser.apellidos"
                    :counter="10"
                    :rules="nameRules"
                    label="Apellidos"
                    variant="outlined"></v-text-field>
                  <v-text-field
                    v-model="datosUser.username"
                    :counter="10"
                    :rules="nameRules"
                    label="Username"
                    variant="outlined"></v-text-field>
                    
                  <v-text-field
                    v-model="datosUser.email"
                    :rules="emailRules"
                    label="E-mail"
                    variant="outlined"
                    disabled
                    required></v-text-field>
                  <v-btn
                    color="success"
                    class="mr-4"
                    @click="actualizarDatosUser">
                    Actualizar</v-btn>

                </v-form>
              </v-sheet>
            </v-col>
      
            <v-responsive width="100%"></v-responsive>
      
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  <FooterSinSesion/>
</template>


<script>
    
    import HeaderAdmin from '../../components/layouts/menus/admin/HeaderAdmin.vue';
    import FooterSinSesion from '@/components/layouts/footers/FooterSinSesion.vue';

    const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com";
    import axios from 'axios';
    const Swal = require('sweetalert2');

    export default {
    components: { HeaderAdmin, FooterSinSesion },
        name: 'DashboardAdmin',
        data: () => ({
          userId: null,
          usuarios:[],
          datosUser:{}
          
        }),
        mounted(){   
          this.comprobarUsuario();
          
          this.cargarUsuarios();  

          axios.get(`${SERVER_URL_COMPROBADA}/user/${this.userId}`)
            .then((response) =>{
              if(response.statusText=="OK"){
                console.log("Exito consultar datos del usuario ");      
                this.datosUser = response.data;
              }else{
                console.log("Error");
              }
            });

            axios.get(`${SERVER_URL_COMPROBADA}/user`)
            .then((response) =>{
              if(response.statusText=="OK"){
                console.log("Exito consultar datos de los usuarios en mounted ");      
                this.usuarios = response.data;
              }else{
                console.log("Error");
              }
            });
        
            // FIN MOUNTED
        },
 

        methods: {
          cargarUsuarios(){
              //CONSULTAR usuarios
              axios.get(`${SERVER_URL_COMPROBADA}/user`)
                            .then((response) =>{

                              if(response.statusText=="OK"){
                                console.log("Exito consultar usuarios en methods ");
                                this.usuarios = response.data;
                              }else{
                                console.log("Error ");
                              }

                          });
            },

            comprobarUsuario(){
              this.userId=localStorage.getItem('adminId'); 
              if(!this.userId){
              this.$router.push(`/signin`);
 
              } 
            },
            async eliminarUsuario(userId){
              const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Si elimina, no podrá recuperar a este usuario.",
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
                  axios.delete(`${SERVER_URL_COMPROBADA}/user/${userId}`) 
                    .then(async(responseDelete) =>{

                      if(responseDelete.statusText=="OK"){
                        Swal.fire(
                          'Eliminado!',
                          'Usuario ha sido eliminado.',
                          'success'
                        )
                        this.cargarUsuarios();

                        console.log("Exito borrar usuario");  
                        
                      }else if(result.dismiss === Swal.DismissReason.cancel){
                        Swal.fire(
                              'Cancelado',
                              'Your imaginary file is safe :)',
                              'error')
                      }else{
                        
                        console.log("Error borrando usuario ");
                      }
                    });
            }
        }
 
    }
  </script>