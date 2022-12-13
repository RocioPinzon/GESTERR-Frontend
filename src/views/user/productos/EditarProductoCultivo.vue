<template>
  <Header/>
  <v-layout>
        <v-main>
            <v-img cover height="400" 
                            src="../../../assets/img/parallax.png">
                        <v-row justify="center" class="mt-16 d-flex align-center pa-10">
                        <v-sheet class="mt-16 pa-2 align-self-end">
                            <h2 class="text-center pa-10">{{ titulo }}</h2>     
                        </v-sheet>
                        </v-row>
                </v-img>
            <v-container class="d-flex flex-column mb-10 pb-10">
                <v-row class="justify-center">
                    <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        lg="4"
                        xl="4"> 
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation>

                            <v-text-field
                                v-model="datosProducto.name"
                                :counter="10"
                                :rules="nameRules"
                                label="Nombre campo"
                                clearable
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="datosProducto.cantidad"
                                :counter="2"
                                variant="outlined"
                                label="Cantidad"
                                clearable
                                type="number"
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="datosProducto.precio"
                                type="number"
                                label="Precio/Kg (Opcional)"
                                variant="outlined">
                            </v-text-field>

                            <v-btn
                                color="success"
                                class="mt-4"
                                @click="actualizarProducto()">{{ textButton }}
                            </v-btn>

                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-layout>
<FooterSinSesion/>
</template>

<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import FooterSinSesion from '@/components/layouts/footers/FooterSinSesion.vue';
import Navigation from '@/components/layouts/menus/user/Navigation.vue';
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
//const Swal = require('sweetalert2');

  export default {
  components: { Navigation, Header, FooterSinSesion },
      name: 'VerCultivos',
      data: () => ({
            titulo:"ACTUALIZAR PRODUCTO",
            textButton:"Actualizar",
            userId: null,
            productoId: null,
            datosProducto:{},
            valid: true,
            nameRules: [
              v => (v && v.length <= 20) || 'Name must be less than 10 characters',
            ],
            titulo:"EDITAR PRODUCTO"
      }),

      mounted(){
      
          this.comprobarUsuario();   
          this.productoId = this.$route.params.productoId;

          // Consultar datos Producto
          axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/productos/${this.productoId}`) 
              .then((response) =>{
                  
              if(response.statusText=="OK"){
                  console.log("Exito consultar producto " + this.productoId);
                  this.datosProducto = response.data;
                  console.log(this.datosProducto);

              }else{
                  console.log("Error");
              }
          }); 
           
      // FIN MOUNTED
      },

      methods: {
          volverProductos(){
              this.$router.push(`/user/productos`);
          },

          reset(){
              this.$refs.form.reset()
          },

          actualizarProducto(){
              let datos = this.datosProducto;
              console.log(datos);
              
              //Actualizar Cultivo
              axios.put(`${SERVER_URL_COMPROBADA}/${this.userId}/productos/${this.productoId}`,datos) 
              .then((response) =>{

                  if(response.statusText=="OK"){
                      console.log("Exito actualizar datos campo ");
                      this.datosProducto= response.data;
                      this.volverProductos();
                  }else{
                      console.log("Error actualizando datos producto");
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