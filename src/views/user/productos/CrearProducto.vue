<template>
  <Header/>
  <v-main>
      <v-container class="d-flex flex-column">
          
          <v-row class="justify-center">
              <v-col
                  cols="6"
                  sm="12">
                  <h2 class="text-center">CREAR PRODUCTO</h2>
              </v-col>

              <v-col
                  cols="6"
                  md="4"
                  sm="12"> 
                  <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation>

                      <v-text-field
                          v-model="datosNuevoProducto.name"
                          :counter="10"
                          :rules="nameRules"
                          label="Nombre cultivo"
                          variant="outlined"
                          required>
                      </v-text-field>

                      <v-text-field
                          v-model="datosNuevoProducto.cantidad"
                          :counter="2"
                          type="number"
                          label="Cantidad (Kg)"
                          variant="outlined"
                          required>
                      </v-text-field>

                      <v-text-field
                          v-model="datosNuevoProducto.precio"
                          type="number"
                          label="Precio/Kg (Opcional)"
                          variant="outlined">
                      </v-text-field>

                      <v-btn
                          color="success"
                          class="mr-4"
                          @click="crearProducto()">Guardar</v-btn>

                  </v-form>
              </v-col>  
          </v-row>

      </v-container>
  </v-main>
<FooterSinSesion/>
</template>

<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import FooterSinSesion from '@/components/layouts/footers/FooterSinSesion.vue';
import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";

  export default {
  components: { Navigation, Header, FooterSinSesion},
      name: 'CrearCultivo',
      data: () => ({
          userId: null,
          datosNuevoProducto:{
              name:"",
              cantidad:"",
              precio:""              
          }
      }),
      mounted(){
          this.comprobarUsuario(); 
          this.productoId = this.$route.params.productoId;

          // FIN MOUNTED
      },


      methods: {
          volverDashboard(){
              this.$router.push(`/user/dashboard`);
          },
          volverProductos(){
            this.$router.push(`/user/productos`);
          },
          crearProducto(){
              let datos = this.datosNuevoProducto;
              console.log(datos);
              
              // CREAR PRODUCTO
              axios.post(`${SERVER_URL_COMPROBADA}/${this.userId}/productos`,datos) 
              .then((response) =>{

                  if(response.statusText=="OK"){
                      console.log("Exito crear producto");
                      this.datosNuevoProducto= response.data;
                      this.volverProductos();
                      
                  }else{
                      console.log("Error creando producto");
                  }
              })
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