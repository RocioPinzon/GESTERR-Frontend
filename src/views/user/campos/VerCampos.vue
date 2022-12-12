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
        <v-container class="mb-5 pb-15">
          
          
          <v-row justify="center" class="d-flex align-center pa-10">
            <v-sheet class="ma-2 pa-2 align-self-end">
              <BarChart/>
            </v-sheet>
            
          </v-row>
          
          <v-row justify="center">
            <v-col
              cols="12"
                sm="12"
                md="12"
                lg="10"
                xl="10"
                class="my-10">
              
              <div class="my-2 py-1 d-flex justify-space-between">
               
                <v-btn 
                  color="success" 
                  elevation="6"
                  @click="agregarCampo()">Añadir campo</v-btn>
        
                  <v-btn 
                  v-model="nCampos"
                  color="success"
                  variant="tonal"
                  elevation="6">Número total de campos: {{ nCampos }}</v-btn>
              </div>
                <v-text-field
                  v-model="search"
                  label="Search (UPPER CASE ONLY)"
                  class="mx-4"
                ></v-text-field>
              

              <v-table
              class="sortable my-10 elevation-5">
              
                  <thead>
                    <tr class="bg-green">
                      <th class="text-center">Nombre</th>
                      <th class="text-center">Direccion</th>
                      <th class="text-center">Hectareas</th>
                      <th class="text-center">Provincia</th>
                      <th class="text-center">Estado</th>
                      <th class="sorttable_nosort text-center">Cultivos de campo</th>
                      
                      <th class="sorttable_nosort text-center">Editar / Eliminar</th>
                    </tr>
                  </thead>
                  <tbody v-if="tablaVacia===false">
                    <tr class="item"
                      v-for="item in camposPage"
                      :key="item._id" >
                     
                      <td class="text-center">{{ item.name }}</td>
                      <td class="text-center">{{ item.direccion }}</td>
                      <td class="text-center">{{ item.hectareas }}</td>
                      <td class="text-center">{{ item.provincia }}</td>
                      <td class="text-center">{{ item.estado }}</td>

                      <td class="text-center">
                        <button @click="verCultivos(item._id)">
                          <v-icon color="#8AA39B">mdi-eye</v-icon>
                        </button>
                      </td>
                      <td class="text-center">
                        <button @click="editarCampo(item._id)">
                          <v-icon color="success">mdi-pencil</v-icon>
                        </button>
                       
                        <button @click="eliminarCampo(item._id)">
                          <v-icon color="error"> mdi-trash-can</v-icon>
                        </button>
                      </td>
                    </tr>  
                  </tbody>
                <tbody v-else>
                  <td colspan="6" class="pa-10 text-center">AÚN NO HAS CREADO NINGÚN CAMPO. AÑADE UN CAMPO NUEVO</td>

                </tbody>
                </v-table>
                <v-sheet>
                  <div class="my-2 py-1 d-flex justify-space-between">
                    <v-btn 
                      color="#906b51" 
                      elevation="6"
                      class="text-white"
                      @click="downloadFile">Descargar .xslx
                    </v-btn>
                  </div>
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
//import * as XLSX from 'xlsx';
const Swal = require('sweetalert2');
import BarChart from '@/components/BarChart'


    export default {
    components: { Header, FooterSinSesion, BarChart },
    
        name: 'Dashboard',
        data: () => ({
          userId: null,
          datosUser:{},
          campos: [],
          nCampos:"",
          model: null,
          search: null,
          titulo: "CAMPOS",
          tablaVacia:false,
          estados:[],
          estadoCampo:"",
          page:1,
          pages:[],
          perPage:5,
          camposPage:[],
          
         
      
    }),
    computed: {
      visiblePages () {
              const camposPaginados= this.campos.slice((this.page - 1)* this.perPage, this.page* this.perPage);
              this.camposPage = camposPaginados;              
              //return camposPaginados;// para verlo en pantall como si fuera consola
          }
        },

      mounted(){
          this.comprobarUsuario(); 
          this.campoId = this.$route.params.campoId;
          this.cargarCampos();  

          //CONSULTAR CAMPOS USER
          axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`)
            .then((response) =>{

              if(response.statusText=="OK"){
                
                console.log("Exito consultar datos usuario ");
                this.datosUser = response.data;
              }else{
                
                console.log("Error ");
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
       
            
            //CONSULTAR CAMPOS USER
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos`)
                            .then((response) =>{

                              if(response.statusText=="OK"){
                                console.log("Exito consultar campos ");
                                this.campos = response.data;
                                this.pages=response.data.length;
                                
                                console.log(this.pages);
                              }else{
                                console.log("Error");
                              }

                          });
                          
            // FIN MOUNTED
        },
 

        methods: {
            /*
            numeroCampos(campos){
              this.nCampos = campos.length;
              console.log("n campos totales: " + this.nCampos);
              //return this.nCampos;
            },*/
            downloadFile: function () {
              const XLSX = require("json-as-xlsx");

              let data = [
                {
                  sheet: "Adults",
                  columns: [
                    { label: "User", value: "user" },
                    { label: "Nombre campo", value: (row) => row.name + "." },
                    { label: "Direccion", value: (row) => row.direccion + "." },
                    { label: "Hectareas", value: (row) => row.hectareas + "." }, 
                    { label: "Fecha creacion campo", value: (row) => row.date + "."}
                  ],
                  content: this.campos,
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
            cargarCampos(){
              //CONSULTAR CAMPOS USER
              axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos`)
                            .then((response) =>{

                              if(response.statusText=="OK"){
                                console.log("Exito consultar campos ");
                                this.campos = response.data;
                                this.nCampos = this.campos.length;
                                
                                if(this.campos.length===0){
                                  
                                  this.tablaVacia=true;
                                  
                                }
                              }else{
                                console.log("Error");
                              }

                          });
            },
            volverDashboard(){
              this.$router.push(`/user/dashboard`);
            },
            verCultivos(campoId){
              this.$router.push(`/user/${campoId}/cultivos`);

            },
            editarCampo(campoId){
              this.$router.push(`/user/${campoId}/editarCampo`);
            },

            agregarCampo(){
              this.$router.push(`/user/crearCampo`);
                
            },

            async eliminarCampo(campoId){
             
              const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Si elimina, ya no podrá recuperar el campo.",
                icon: 'question',
                
                confirmButtonText: '¡Si, eliminar!',
                confirmButtonColor: '#679e1a',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#d33',
                reverseButtons: false
              });
              
              // se para si el usuario no confirma
               if (!result.value) {
                  return;
               }

                  // DELETE           
                  axios.delete(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${campoId}`) 
                    .then(async(responseDelete) =>{

                      if(responseDelete.statusText=="OK"){
                        Swal.fire(
                          '¡Eliminado!',
                          'Tu campo ha sido eliminado.',
                          'success'
                        )
                        this.cargarCampos();
                        console.log("Exito borrar campos");  
                        
                        
                      }else if(result.dismiss === Swal.DismissReason.cancel){
                        Swal.fire(
                              'Cancelado',
                              'Your imaginary file is safe :)',
                              'error')
                      }else{
                        
                        console.log("Error borrando campo ");
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