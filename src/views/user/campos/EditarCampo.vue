<template>
    <Header/>
    <v-layout>
        <v-main>
            <v-img cover height="450" 
                    src="../../../assets/img/parallax.png">
                    <v-row justify="center" class="mt-16 d-flex align-center pa-10">
                        <v-sheet elevation="6" class="mt-16 pa-2 align-self-end">
                        
                            <h2 class="text-center pa-10">{{ titulo }}</h2>
                        
                        </v-sheet>
                    </v-row>
                </v-img>
            <v-container class="d-flex flex-column mb-10 pb-10">
                <v-row class="justify-center">
                    <v-col
                        cols="6"
                        md="4"
                        sm="12"> 
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation>

                            <v-text-field
                                v-model="datosCampos.name"
                                :counter="10"
                                :rules="nameRules"
                                label="Nombre campo"
                                clearable
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="datosCampos.direccion"
                                :counter="30"
                                :rules="direccionRules"
                                label="Dirección"
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="datosCampos.hectareas"
                                :counter="3"
                                label="Hectáreas"
                                type="number"
                                variant="outlined"
                                required>
                            </v-text-field>
                            <v-select
                                v-model="datosCampos.provincia"
                                :items="items"
                                item-title="nm"
                                item-value="datosCampos.provincia"
                                label="Elige una provincia" 
                                return-object
                                single-line
                                disabled
                                variant="outlined">  
                            </v-select>
                            <v-btn
                                color="success"
                                class="mr-4"
                                @click="actualizarCampos"
                                >Actualizar
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

import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
//const Swal = require('sweetalert2');

    export default {
        components:{ Header, FooterSinSesion },
        name: 'VerCultivos',
        
        data: () => ({
            titulo:"EDITAR CAMPO",
            userId: null,
            campoId: null,
            datosCampos:{},
            valid: true,
            nameRules: [
                v => (v && v.length <= 20) || 'Name must be less than 10 characters',
            ],
            direccionRules: [
                v => (v && v.length <= 30) || 'Name must be less than 10 characters',
            ]
        }),

        mounted(){

            this.comprobarUsuario();
            this.campoId = this.$route.params.campoId;

            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}`) // Consultar datos Campos
                .then((response) =>{

                if(response.statusText=="OK"){
                    console.log("Exito consultar campos ");
                    this.datosCampos = response.data;
                }else{
                    console.log("Error");
                }

            });       
        // FIN MOUNTED
        },
 

        methods: {
            volverCampos(){
                this.$router.push(`/user/campos`);
            },

            reset(){
                this.$refs.form.reset()
            },

            actualizarCampos(){
                let datos = this.datosCampos;
                console.log(datos);
                
                axios.put(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}`,datos) //Actualizar Campo
                .then((response) =>{

                if(response.statusText=="OK"){
                    console.log("Exito actualizar datos campo ");
                    this.datosCampos= response.data;
                    this.volverCampos();
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