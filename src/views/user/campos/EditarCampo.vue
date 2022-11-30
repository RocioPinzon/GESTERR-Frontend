<template>
    <Header/>
    <v-main>
        <v-container class="d-flex flex-column">
            <v-row class="justify-center">
                <v-col
                    cols="6"
                    sm="12">
                    <h2 class="text-center">ACTUALIZAR DATOS DEL CAMPO {{ }}</h2>
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
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="datosCampos.hectareas"
                            :counter="3"
                            label="Hectáreas"
                            type="number"
                            required>
                        </v-text-field>

                        <v-btn
                            color="success"
                            class="mr-4"
                            @click="actualizarCampos"
                            >Actualizar
                        </v-btn>

                        <v-btn
                            color="error"
                            class="mr-4"
                            @click="reset">
                            Borrar datos
                        </v-btn>

                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
//const Swal = require('sweetalert2');

    export default {
        components:{
            Header
        },
        name: 'VerCultivos',
        
        data: () => ({
            valid:true,
            nombreCampo:'',
            direccion:'',
            hectareas: '',
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
                console.log();

            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}`) // Consultar datos Campos
                .then((response) =>{

                if(response.statusText=="OK"){
                    console.log("Exito consultar campos ");
                    this.datosCampos = response.data;
                }else{
                    console.log("Error haciendo login ");
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