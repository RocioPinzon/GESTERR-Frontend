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
                                v-model="datosNuevoCampo.name"
                                :counter="10"
                                :rules="nameRules"
                                label="Nombre campo"
                                clearable
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="datosNuevoCampo.direccion"
                                :counter="30"
                                :rules="nameRules"
                                label="Dirección"
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                                v-model="datosNuevoCampo.hectareas"
                                :counter="2"
                                type="number"
                                :rules="nameRules"
                                label="Hectáreas"
                                variant="outlined"
                                required>
                            </v-text-field>
                            <v-select
                                v-model="datosNuevoCampo.valueSelect"
                                :items="items"
                                item-title="nm"
                                item-value="id"
                                label="Elige una provincia" 
                                return-object
                                single-line
                                variant="outlined">  
                            </v-select>                  

                            <v-btn
                                color="success"
                                class="mr-4"
                                @click="crearCampo()">Guardar
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
    components: { Header, FooterSinSesion },
        name: 'CrearCampo',
        data: () => ({
            userId: null,
            titulo:"CREAR NUEVO CAMPO",
            datosNuevoCampo:{
                name:"",
                direccion:"",
                hectareas:"",
                valueSelect:"",
                provincia:""
            },
            items:[],//items provincias que recojo para mostrar los options del select
            //idSelect:"",
            //valueSelect:"",
            //provinciaSeleccionada:""
        }),
        mounted(){
            this.comprobarUsuario(); 
            axios.get(`https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json`)
                .then((response)=>{
                    this.items= response.data;
                    this.valueSelect=response.data.nm;

                    console.log("this.items --> " + this.items)
                })
            // FIN MOUNTED
        },
 

        methods: {
            obtenerProvincias(){
                
            },
            volverCampos(){
                this.$router.push(`/user/campos`);
            },

            crearCampo(){                
                
                this.datosNuevoCampo.provincia=this.datosNuevoCampo.valueSelect.nm;
                
                let datos = this.datosNuevoCampo;
                
                //console.log("valueSelect ---> "+ this.datosNuevoCampo.valueSelect.nm);//valor bueno
                axios.post(`${SERVER_URL_COMPROBADA}/${this.userId}/campos`,datos) //Actualizar Campo
                .then((response) =>{

                    if(response.statusText=="OK"){
                        console.log("Exito actualizar datos campo ");
                        this.datosNuevoCampo= response.data;
                        console.log("-------------------\n ");
                        console.log("Datos cambiados: "+ this.datosNuevoCampo);
                        this.volverCampos();
                        console.log(this.datosNuevoCampo);

                        console.log(response.data);
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