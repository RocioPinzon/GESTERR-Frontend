<template>
    <Header/>
    <v-layout>
        <v-main>
            <v-img cover height="450" 
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
                                v-model="datosNuevoCultivo.nombre"
                                :counter="10"
                                :rules="nameRules"
                                label="Nombre cultivo"
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="datosNuevoCultivo.cantidad"
                                :counter="2"
                                type="number"
                                :rules="nameRules"
                                label="Cantidad (nº aprox)"
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="datosNuevoCultivo.hectareas"
                                :counter="2"
                                type="number"
                                :rules="nameRules"
                                label="Hectareas"
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-select
                                v-model="datosNuevoCultivo.estado"
                                :items="estados"
                                label="Estado" 
                                return-object
                                single-line
                                variant="outlined">  
                            </v-select> 

                            <v-btn
                                color="success"
                                class="mr-4"
                                @click="crearCultivo()"
                                >Guardar
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

    export default {
    components: { Header, FooterSinSesion},
        name: 'CrearCultivo',
        data: () => ({
            userId: null,
            datosNuevoCultivo:{
                nombre:"",
                cantidad:"",
                hectareas:"",
                estado:""               
            },
            titulo:"CREAR CULTIVO",
            estados:['SEMBRADO','RECOLECTADO']

        }),
        mounted(){
            this.comprobarUsuario(); 
            this.campoId = this.$route.params.campoId;

            // FIN MOUNTED
        },
 

        methods: {
            volverDashboard(){
                this.$router.push(`/user/${this.campoId}/cultivos`);
            },

            crearCultivo(){
                let datos = this.datosNuevoCultivo;
                console.log(datos);
                
                axios.post(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos`,datos) // Crear Cultivo
                .then((response) =>{

                    if(response.statusText=="OK"){
                        console.log("Exito actualizar datos campo ");
                        this.datosNuevoCultivo= response.data;
                        this.volverDashboard();
                        
                    }else{
                        console.log("Error creando campo");
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