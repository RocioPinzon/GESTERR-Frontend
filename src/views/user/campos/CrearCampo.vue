<template>
    <Header/>
    <v-main>
        <v-container class="d-flex flex-column">
            <v-row class="justify-center">
                <v-col
                    cols="6"
                    sm="12">
                    <h2 class="text-center">CREAR DATOS DEL CAMPO {{ }}</h2>
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
</template>

<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";

    export default {
    components: { Navigation, Header },
        name: 'CrearCampo',
        data: () => ({
            userId: null,
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