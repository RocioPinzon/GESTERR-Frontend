<template>
  <Header/>
    <v-layout>
      <v-main>
        <v-container class="">

          <v-row justify="center" class="d-flex align-center pa-10">
            <v-sheet class="ma-2 pa-2 align-self-end">
              <v-img
                src="../../../assets/img/fondo-titulos.png">
                <h2 class="text-center py-15">{{ titulo }}</h2>
              </v-img>
            </v-sheet>
          </v-row>

          <v-row justify="center">
            <v-col
              cols="12"
              sm="10"
              md="9"
              lg="7"
              xl="5">
                <div class="ma-2 py-1 d-flex justify-space-between">
                  <v-btn 
                  color="success" 
                  elevation="6"
                  @click="agregarCultivo()">Añadir Cultivo</v-btn>
              </div>
              
                  <v-table class="sortable my-10 elevation-5">
                    <thead>
                      <tr class="bg-green">
                        <th class="text-center">{{ nombre }}</th>
                        <th class="text-center">{{ cantidad }}</th>
                        <th class="sorttable_nosort text-center">Editar / Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in cultivos"
                        :key="item._id" >
                        <td class="text-center">{{ item.nombre }}</td>
                        <td class="text-center">{{ item.cantidad }}</td>
                        <td class="text-center">
                          <button variant="flat" @click="editarCultivo(item._id)">
                            <v-icon color="success">mdi-pencil</v-icon>
                          </button>
                          <button variant="flat" @click="eliminarCultivo(item._id)">
                            <v-icon color="error">mdi-trash-can</v-icon>
                          </button>
                        </td>
                        
                      </tr>
                    </tbody>
                  </v-table>
                  
                
                <div class="my-2 py-2 d-flex justify-space-between">
                  <v-btn 
                    color="#906b51" 
                    elevation="6"
                    class="text-white"
                    @click="downloadFile">Descargar .xslx
                  </v-btn>
                </div>
              </v-col>
            </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </template>
  

<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import Navigation from '@/components/layouts/menus/user/Navigation.vue'
import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components: { Navigation,Header },
        name: 'VerCultivos',
        data: () => ({
          userId: null,
          campoId: null,
          datosUser:{},
          datosCultivo:{},
          cultivos: [],
          titulo:"CULTIVOS",
          cantidad:"Cantidad",
          nombre:"Nombre cultivos"
        }),
        mounted(){
          this.comprobarUsuario();   
          this.campoId = this.$route.params.campoId;

          this.cargarCultivos(); 

          axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`)
            .then((response) =>{

              if(response.statusText=="OK"){
                console.log("Exito consultar datos usuario ");
                this.datosUser = response.data;
                
              }else{
                console.log("Error");
              }
            });      
            //  AÑADIR SCRIPT PARA LLAMAR SORT
            let ordenar = document.createElement('script');
            ordenar.setAttribute('src', 'https://www.kryogenix.org/code/browser/sorttable/sorttable.js');
            document.head.appendChild(ordenar);

            setTimeout(() => {
              var newTableObject = document.querySelector('.sortable table');
              sorttable.makeSortable(newTableObject)
            }, "1500");
                   
            // FIN MOUNTED
        },

        methods: {
          cargarCultivos(){

            //CONSULTAR CULTIVOS DE UN CAMPO  
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos`) 
                .then((response) =>{

                  if(response.statusText=="OK"){
                    console.log("Exito consultar cultivos ");
                    this.cultivos = response.data;

                  }else{
                    console.log("Error get cultivos  ");
                  }

                }); 
            },
            downloadFile: function () {
              const XLSX = require("json-as-xlsx");

              let data = [
                {
                  sheet: "Adults",
                  columns: [
                    { label: "ID Campo", value: "campoId" },
                    { label: "Nombre cultivo", value: (row) => row.nombre + "." },
                    { label: "Cantidad", value: (row) => row.cantidad + "." }, // Top level data
                    { label: "Fecha", value: (row) => row.date + "." },
                  ],
                  content: this.cultivos,
                }
              ]

              let settings = {
                fileName: "excelDatos", // Name of the resulting spreadsheet
                extraLength: 3, // A bigger number means that columns will be wider
                writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
                writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
                RTL: false, // Display the columns from right-to-left (the default value is false)
              }

              XLSX(data, settings) 
              //XLSX(columns, content, settings);
            },
            volverDashboard(){
              this.$router.push(`/user/dashboard`);
            },
            agregarCultivo(){
              this.$router.push(`/user/${this.campoId}/cultivos/crearCultivo`);
            },
            verProductos(){
              this.$router.push(`/user/productos`);
            },
            async eliminarCultivo(cultivoId){
              
              const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Si elimina, ya no podrá recuperar el campo.",
                icon: 'question',
                
                confirmButtonColor: '#679e1a',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Si, eliminar!',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                reverseButtons: false
              });
              
              // Stop if user did not confirm
               if (!result.value) {
                  return;
               }

                  // DELETE           
                  axios.delete(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${cultivoId}`) 
                    .then(async(responseDelete) =>{

                      if(responseDelete.statusText=="OK"){
                        Swal.fire(
                          'Eliminado!',
                          'Tu campo ha sido eliminado.',
                          'success'
                        )
                        this.cargarCultivos();

                        console.log("Exito borrar campos");  
                        
                      }else if(result.dismiss === Swal.DismissReason.cancel){
                        Swal.fire(
                              'Cancelled',
                              'Your imaginary file is safe :)',
                              'error')
                      }else{
                        
                        console.log("Error borrando campo ");
                      }

                    });
                
            },
            editarCultivo(cultivoId){
              this.$router.push(`/user/${this.campoId}/cultivos/${cultivoId}/editarCultivo`);

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