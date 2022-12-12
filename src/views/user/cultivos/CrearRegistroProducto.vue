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
            <v-container class="d-flex flex-column mb-15">
                <v-row class="justify-center">
                    <v-col
                        cols="6"
                        md="4"
                        sm="12"> 
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation>

                            <v-select
                                v-model="datosNuevoRegistroProducto.productoId"
                                :items="productos"
                                item-value="productos"
                                label="Producto" 
                                return-object
                                single-line
                                variant="outlined">  
                            </v-select>

                            <v-select
                                v-model="datosNuevoRegistroProducto.estado"
                                :items="estados"
                                :item-title="name"
                                :item-value="id"
                                label="Estado" 
                                return-object
                                single-line
                                variant="outlined">  
                            </v-select>

                            <v-btn
                                color="success"
                                class="mr-4"
                                @click="crearRegistroProductoCultivo()"
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
        name: 'CrearRegistroProducto',
        data: () => ({
            userId: null,
            datosNuevoRegistroProducto:{
                cultivoId:"",
                productoId:""                    
            },
            obtenerProductoId:"",
            ids:"",
            datosProductoId:{},
            nombreProductos:[],
            productos:[],
            estados:['SEMBRADO', 'RECOLECTADO'],

            titulo: "CREAR REGISTRO DE PRODUCTO"
        }),
        mounted(){
            this.comprobarUsuario(); 
            this.campoId = this.$route.params.campoId;
            this.cultivoId = this.$route.params.cultivoId;
            this.datosNuevoRegistroProducto.cultivoId = this.cultivoId;

            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/productos`) // Consultar datos Campos
                .then((response) =>{

                if(response.statusText=="OK"){
                    console.log("Exito consultar campos ");
                    this.productos = response.data;
                    this.obtenerProductoId=response.data.id;
                    var arrayLength = response.data.length;

                    for (var i = 0; i < arrayLength; i++) {
                        this.productos[i] = response.data[i]._id;
                    }
                    
                    console.log("PRODUCTOS DESPUES DE FOR -- arrayProductoName");
                    console.log(this.productos);

                    console.log("obtenerProductoId DESPUES DE FOR -- obtenerProductoId");
                    console.log(this.obtenerProductoId);
                }else{
                    console.log("Error");
                }

            });

            
            // FIN MOUNTED
        },
 

        methods: {
            volverRegistroCultivo(){
                this.$router.push(`/user/${this.campoId}/cultivos/${this.cultivoId}/registroproductos`);
            },

            crearRegistroProductoCultivo(){
                
                let datos = this.datosNuevoRegistroProducto;
                console.log("datos");
                console.log(datos);

                axios.post(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${this.cultivoId}/registroproductos`,datos) //Crear registro producto
                .then((response) =>{

                    if(response.statusText=="OK"){
                        console.log("Exito crear registro ");
                        this.datosNuevoRegistroProducto= response.data;
                        this.volverRegistroCultivo();
                        
                    }else{
                        console.log("Error creando campo");
                    }
                });
                /*axios.put(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${this.cultivoId}/productos`,datos) //Actualizar Cultivo
                .then((response) =>{

                    if(response.statusText=="OK"){
                        console.log("Exito actualizar datos campo ");
                        this.datosNuevoProducto= response.data;
                        this.volverRegistroCultivo();
                        
                    }else{
                        console.log("Error creando campo");
                    }
                })*/
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