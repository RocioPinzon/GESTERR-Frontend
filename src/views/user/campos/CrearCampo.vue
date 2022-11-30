<template>
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

                        <v-btn
                            color="success"
                            class="mr-4"
                            @click="crearCampo()"
                            >Guardar
                        </v-btn>


                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>

     
import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";

    export default {
    components: { Navigation },
        name: 'CrearCampo',
        data: () => ({
          userId: null,
          datosNuevoCampo:{
                name:"",
                direccion:"",
                hectareas:""
            }
        }),
        mounted(){

          this.userId=localStorage.getItem('userId');  
            // FIN MOUNTED
        },
 

        methods: {
            volverDashboard(){
                this.$router.push(`/user/dashboard`);
            },

            crearCampo(){
                let datos = this.datosNuevoCampo;
                console.log(datos);
                
                axios.post(`${SERVER_URL_COMPROBADA}/${this.userId}/campos`,datos) //Actualizar Campo
                .then((response) =>{

                    if(response.statusText=="OK"){
                        console.log("Exito actualizar datos campo ");
                        this.datosNuevoCampo= response.data;
                        this.$router.push(`/user/dashboard`);
                        console.log(response.data);
                    }else{
                        console.log("Error creando campo");
                    }
                })
            }
        }
 
    }


</script>