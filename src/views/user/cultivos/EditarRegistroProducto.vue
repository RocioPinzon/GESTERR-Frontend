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
            <v-container class="d-flex flex-column mb-15 pb-5">
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
                                v-model="datosProductoCultivo.name"
                                :counter="10"
                                :rules="nameRules"
                                label="Nombre cultivo"
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="datosProductoCultivo.cantidad"
                                :counter="2"
                                type="number"
                                :rules="nameRules"
                                label="Cantidad"
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                            v-model="datosProductoCultivo.precio"
                            type="number"
                            label="Precio/Kg (Opcional)"
                            variant="outlined">
                            </v-text-field>

                            <v-btn color="success" class="mr-4" @click="actualizarProductoCultivo()">Guardar</v-btn>

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
            campoId: null,
            cultivoId: null,
            productoId:null,
            datosProductoCultivo:{},
            titulo:"EDITAR PRODUCTO DE CULTIVO"
        }),
        mounted(){
            this.comprobarUsuario(); 
            this.campoId = this.$route.params.campoId;
            this.cultivoId = this.$route.params.cultivoId;
            this.productoId = this.$route.params.productoId;

            // Consultar datos de un producto de un cultivo
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${this.cultivoId}/productos/${this.productoId}`) 
                .then((response) =>{
                    
                if(response.statusText=="OK"){
                    console.log("Exito consultar cultivo " + this.productoId);
                    this.datosProductoCultivo = response.data;
                    console.log(this.datosProductoCultivo);

                }else{
                    console.log("Error");
                }
            }); 
            // FIN MOUNTED
        },
 

        methods: {
            volverProductosCultivo(){
                this.$router.push(`/user/${this.campoId}/cultivos/${this.cultivoId}/productos`);
            },

            actualizarProductoCultivo(){
                let datos = this.datosProductoCultivo;
                console.log(datos);
                
                //Actualizar producto de Cultivo
                axios.put(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${this.cultivoId}/productos/${this.productoId}`,datos) 
                .then((response) =>{

                    if(response.statusText=="OK"){
                        console.log("Exito actualizar datos producto cultivo");
                        this.datosProductoCultivo= response.data;
                        this.volverProductosCultivo();
                    }else{
                        console.log("Error actualizando producto de cultivo");
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