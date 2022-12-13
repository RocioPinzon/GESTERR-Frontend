<template>
  <Header/>
    <v-layout>
      <v-main>
        <v-img cover height="400" 
                src="../../../assets/img/parallax.png">
          <v-row justify="center" class="mt-16 d-flex align-center pa-10">
            <v-sheet class="mt-16 pa-2 align-self-end">
              
                <h2 class="text-center pa-2">{{ titulo }}</h2>
                <h3 class="text-center pa-2">{{ subtitulo }}</h3>
                
            </v-sheet>
          </v-row>
        </v-img>
        <v-container class="mb-5 pb-15">

          <v-row justify="center">
            <v-col
              cols="12"
              sm="10"
              md="9"
              lg="7"
              xl="5"
              class="my-10">

                <div class="my-2 py-1 d-flex justify-space-between">
                  
                    <v-btn 
                      color="#906b51" 
                      elevation="6"
                      class="text-white"
                      @click="downloadFile">Descargar .xslx
                    </v-btn>
                  
              </div>
              
                  <v-table class="sortable my-6 elevation-5">
                    <thead>
                      <tr class="bg-green">
                        <th class="text-center">{{ nombre }}</th>
                        <th class="text-center">{{ cantidad }}</th>
                        <th class="text-center">{{ hectareas }}</th>
                        <th class="sorttable_nosort text-center">Editar / Eliminar</th>
                      </tr>
                    </thead>
                    <tbody v-if="tablaVacia===false">
                      <tr
                        v-for="item in cultivosPage"
                        :key="item._id" >
                        <td class="text-center">{{ item.nombre }}</td>
                        <td class="text-center">{{ item.cantidad }}</td>
                        <td class="text-center">{{ item.hectareas }}</td>

                        <td class="text-center">
                          <button variant="flat" @click="eliminarCultivo(item._id)">
                            <v-icon color="error">mdi-trash-can</v-icon>
                          </button>
                        </td>
                        
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <td colspan="6" class="pa-10 text-center">AÚN NO HAS CREADO NINGÚN CULTIVO EN ESTE CAMPO. AÑADE UN CULTIVO NUEVO</td>

                    </tbody>
                  </v-table>
                  
                <v-sheet>
                  <div class="text-center">
                    {{visiblePages}}
                    <v-pagination
                      v-model="page"
                      :length="Math.ceil(pages/perPage)"
                      ></v-pagination>
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row justify="center" class="d-flex align-center pa-10">
            <v-sheet class="ma-2 pa-2 align-self-end">
              <BarChartTodosCultivos/>
            </v-sheet>
                       
          </v-row>
          </v-container>
      </v-main>
    </v-layout>
<FooterSinSesion/>
  </template>
  
<script>

import Header from '@/components/layouts/menus/user/Header.vue';
import FooterSinSesion from '@/components/layouts/footers/FooterSinSesion.vue';
import CardDatosCampo from '@/components/layouts/CardDatosCampo.vue';
import BarChartTodosCultivos from '@/components/BarChartTodosCultivos.vue'

import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components: { Header, FooterSinSesion, BarChartTodosCultivos, CardDatosCampo },
        name: 'VerCultivos',
        data: () => ({
          userId: null,
          campoId: null,
          datosUser:{},
          datosCampo:{},
          datosCultivo:{},
          cultivos: [],
          titulo:"TODOS LOS CULTIVOS",
          subtitulo: "Listado de los cultivos presentes en todos los campos",
          cantidad:"Cantidad (nº aprox)",
          hectareas:"Hectareas",
          nombre:"Nombre cultivos",
          tablaVacia:false,
          nCultivos:"",
          nTotalHectareasCultivos:"",
          page:1,
          pages:[],
          perPage:5,
          cultivosPage:[],
          embedCampo:"",
          items:[
            {
              icon: 'mdi-clock',
              text:""
            }
          ]
        }),

        computed: {
          visiblePages () {
              const cultivosPaginados= this.cultivos.slice((this.page - 1)* this.perPage, this.page* this.perPage);
              console.log("cultivosPaginados");
              console.log(cultivosPaginados);

              console.log("this");
              console.log(this);
              this.cultivosPage = cultivosPaginados;              
              //return productoPaginados; para verlo en pantall como si fuera consola
          }
        },

        mounted(){
          
          this.comprobarUsuario();     
          this.campoId = this.$route.params.campoId;
          this.cultivoId = this.$route.params.cultivoId;
          this.cargarCultivos();

          axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`)
            .then((response) =>{

              if(response.statusText=="OK"){
                console.log("Exito consultar datos usuario");
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

            // Cargar datos cultivos de un campo al cargar la pagina
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/cultivos`) 
                .then((response) =>{

                  if(response.statusText=="OK"){
                    console.log("Exito consultar cultivos");
                   
                    this.cultivos = response.data;
                    this.pages=response.data.length;
                    console.log("this.cultivos");

                    console.log(this.cultivos);
                        if(this.cultivos.length===0){
                          
                          this.tablaVacia=true;
                        }
                    
                  }else{
                    console.log("Error get cultivos");
                  }

              }); 
       
            // FIN MOUNTED
        },

        methods: {

          // Comprobar usuario
          comprobarUsuario(){
              this.userId=localStorage.getItem('userId'); 
              if(!this.userId){
                this.$router.push(`/signin`);
              } 
          },

                 
          // Cargar información cultivos
          cargarCultivos(){
            //CONSULTAR CULTIVOS DE UN CAMPO  
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/cultivos`) 
                .then((response) =>{

                  if(response.statusText=="OK"){
                
                     
                    console.log("Exito consultar cultivos ");
                    this.cultivos = response.data;
                    this.nCultivos = this.cultivos.length;
                    if(this.cultivos.length===0){
                      this.tablaVacia=true;
                    }
                    
                        
                  }else{
                    console.log("Error get cultivos ");
                  }

                }); 
            },

          //Descargar json tabla a Excel
          downloadFile: function () {
            const XLSX = require("json-as-xlsx");

            let data = [
                {
                  sheet: "Adults",
                  columns: [
                    { label: "ID Cultivo", value: "cultivoId" },
                    { label: "Nombre cultivo", value: (row) => row.nombre },
                    { label: "Cantidad", value: (row) => row.cantidad }, // Top level data
                    { label: "Hectareas", value: (row) => row.hectareas },
                    { label: "Fecha", value: (row) => row.date },
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
          },
            
          // Volver dashboard
          volverDashboard(){
            this.$router.push(`/user/dashboard`);
          },
          
          // Agregar cultivo
          agregarCultivo(){
            this.$router.push(`/user/${this.campoId}/cultivos/crearCultivo`);
          },
            
                                  
          // Eliminar cultivo
          async eliminarCultivo(cultivoId){
            
            const result = await Swal.fire({
              title: '¿Estás seguro?',
              text: "Si elimina, ya no podrá recuperar el cultivo.",
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
                // AXIOS DELETE          
                axios.delete(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos/${cultivoId}`) 
                  .then(async(responseDelete) =>{

                    if(responseDelete.statusText=="OK"){
                      Swal.fire(
                        'Eliminado!',
                        'Tu cultivo ha sido eliminado.',
                        'success'
                      )

                      this.cargarCultivos();

                      console.log("Exito borrar campos");  
                      
                    }else if(result.dismiss === Swal.DismissReason.cancel){
                      Swal.fire(
                            'Cancelado',
                            'Your imaginary file is safe :)',
                            'error')
                    }else{
                      console.log("Error borrando cultivo");
                    }

                  }); 
            }
        }
 
    }
  </script>