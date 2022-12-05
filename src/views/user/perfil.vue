<template>
  <Header/>
    <v-container class="">
      <v-row no-gutters>
       prueba
  
      </v-row>
    </v-container>
  </template>  
<script>

    import Header from '@/components/layouts/menus/user/Header.vue';
    import axios from 'axios';
    //  Heroku   //
    const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
    const Swal = require('sweetalert2');

    export default {
      name: 'Perfil',
      
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
                
                axios.put(`${SERVER_URL_COMPROBADA}/${this.userId}`,datos) //Actualizar Campo
                .then((response) =>{

                if(response.statusText=="OK"){
                    console.log("Exito actualizar datos campo ");
                    this.datosUser= response.data;
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
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