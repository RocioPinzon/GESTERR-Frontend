<template>
    <Header/>
    <v-main>
        <v-container class="d-flex flex-column">
            <v-row class="justify-center">
                <v-col
                    cols="6"
                    sm="12">
                    <h2 class="text-center">ACTUALIZAR DATOS CULTIVO {{ }}</h2>
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
                            v-model="datosCultivos.nombre"
                            :counter="10"
                            :rules="nameRules"
                            label="Nombre campo"
                            clearable
                            variant="outlined"
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="datosCultivos.cantidad"
                            :counter="2"
                            variant="outlined"
                            label="Hectáreas"
                            clearable
                            required>
                        </v-text-field>

                        <v-btn
                            color="success"
                            class="mr-4"
                            @click="actualizarCultivos()"
                            >Actualizar
                        </v-btn>

                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import Navigation from '@/components/layouts/menus/user/Navigation.vue';
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
//const Swal = require('sweetalert2');

    export default {
    components: { Navigation, Header },
        name: 'VerCultivos',
        data: () => ({
            userId: null,
            campoId: null,
            cultivoId: null,
            datosCultivos:{},
            valid: true,
            nameRules: [
                v => (v && v.length <= 20) || 'Name must be less than 10 characters',
            ]
        }),

        mounted(){
        
            this.comprobarUsuario();   
            this.campoId = this.$route.params.campoId;
            this.cultivoId = this.$route.params.cultivoId;

            // Consultar datos Cultivo
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${this.cultivoId}`) 
                .then((response) =>{
                    
                if(response.statusText=="OK"){
                    console.log("Exito consultar cultivo " + this.cultivoId);
                    this.datosCultivos = response.data;
                    console.log(this.datosCultivos);

                }else{
                    console.log("Error");
                }
            }); 
             
        // FIN MOUNTED
        },

        methods: {
            volverCultivos(){
                this.$router.push(`/user/${this.campoId}/cultivos`);
            },

            reset(){
                this.$refs.form.reset()
            },

            actualizarCultivos(){
                let datos = this.datosCultivos;
                console.log(datos);
                
                //Actualizar Cultivo
                axios.put(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${this.cultivoId}`,datos) 
                .then((response) =>{

                    if(response.statusText=="OK"){
                        console.log("Exito actualizar datos campo ");
                        this.datosCultivos= response.data;
                        this.volverCultivos();
                    }else{
                        console.log("Error actualizando datos cultivo");
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