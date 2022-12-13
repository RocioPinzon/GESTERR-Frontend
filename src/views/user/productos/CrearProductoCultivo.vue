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
</v-layout>
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
              precio:"" ,
              cultivoId:"",
              campoId:""            
          },
          titulo:"INSERTAR PRODUCTO"
      }),
      mounted(){
          this.comprobarUsuario(); 
          this.campoId = this.$route.params.campoId;
          this.cultivoId = this.$route.params.cultivoId;
          this.productoId = this.$route.params.productoId;

          // FIN MOUNTED
      },


      methods: {
          volverDashboard(){
              this.$router.push(`/user/dashboard`);
          },
          volverProductos(){
            this.$router.push(`/user/${this.campoId}/cultivos/${this.cultivoId}/productos`);
          },
          crearProducto(){
              let datos = this.datosNuevoProducto;
              console.log(datos);
              
              // CREAR PRODUCTO
              axios.post(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${this.cultivoId}/productos`,datos) 
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