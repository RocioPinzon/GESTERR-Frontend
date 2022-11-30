<template>
    <v-main>
        <v-container class="d-flex flex-column">
            <v-row class="justify-center">
                <v-col
                    cols="6"
                    sm="12">
                    <h2 class="text-center">CREAR CULTIVO DEL CAMPO {{ }}</h2>
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
                            label="Cantidad"
                            required>
                        </v-text-field>

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
</template>

<script>

     
import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";

    export default {
    components: { Navigation },
        name: 'CrearCultivo',
        data: () => ({
          userId: null,
          datosNuevoCultivo:{
                nombre:"",
                cantidad:""                
            }
        }),
        mounted(){

          this.userId=localStorage.getItem('userId');  
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
                
                axios.post(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos`,datos) //Actualizar Cultivo
                .then((response) =>{

                    if(response.statusText=="OK"){
                        console.log("Exito actualizar datos campo ");
                        this.datosNuevoCultivo= response.data;
                        this.volverDashboard();
                        
                    }else{
                        console.log("Error creando campo");
                    }
                })
            }
        }
 
    }


</script>