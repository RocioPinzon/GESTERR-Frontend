<template>
  <Header/>
    <v-container class="">
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
  <FooterSinSesion/>
</template>  
<FooterSinSesion/>
<script>

    import Header from '@/components/layouts/menus/user/Header.vue';
    import FooterSinSesion from '@/components/layouts/footers/FooterSinSesion.vue';
    import axios from 'axios';
    //  Heroku   //
    const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
    const Swal = require('sweetalert2');

    export default {
      name: 'Perfil',
      components: { Navigation,Header,FooterSinSesion },
        data: () => ({
          userId: null,
          datosUser:{}
        }),
        mounted(){
          this.comprobarUsuario();  
                          
          //CONSULTAR CAMPOS USER
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
          cargarDatosUsuarios(){

            //CONSULTAR PRODUCTOS USER  
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`) 
              .then((response) =>{

                if(response.statusText=="OK"){
                  console.log("Exito consultar productos ");
                  this.datosUser = response.data;

                }else{
                  console.log("Error al consultar todos los productos. ");
                }

              }); 
            },

            actualizarDatosUser(){
                let datos = this.datosUser;
                console.log(datos);
                
                axios.put(`${SERVER_URL_COMPROBADA}/${this.userId}`,datos) //Actualizar datos usuario
                .then((response) =>{

                if(response.statusText=="OK"){
                    console.log("Exito actualizar datos campo ");
                    this.datosUser= response.data;
                    Swal.fire({
                        
                        icon: 'success',
                        title: 'Tus datos han sido actualizados',
                        showConfirmButton: false,
                        timer: 1500
                      });
                    this.cargarDatosUsuarios();

                    console.log(response.data);
                }else{
                    console.log("Error actualizando datos campo");
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