<template>
  <Header/>
    <v-layout>
      <v-main>
        <v-img cover height="425" 
                src="../../../assets/img/parallax.png">
          <v-row justify="center" class="mt-16 d-flex align-center pa-10">
            <v-sheet class="mt-16 pa-2 align-center">
              
              <h2 class="text-center mt-15 pt-2">{{ titulo }}</h2>
              <h2 class="text-center pb-2">en {{datosCampo.name}}</h2>

              <div class="text-center">
                <v-chip
                  class="ma-2"
                  color="success"
                  variant="outlined">
                  <v-icon start icon="mdi-plus"></v-icon>
                  Hectareas del campo: {{ datosCampo.hectareas }}
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="success"
                  variant="outlined">
                  <v-icon start icon="mdi-plus"></v-icon>
                  Nº de cultivos: {{ nCultivos }}
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="success"
                  variant="outlined">
                  <v-icon start icon="mdi-plus"></v-icon>
                  Nº total de hectareas: {{ nTotalHectareasCultivos }}
                </v-chip>
              </div>
            </v-sheet>
          </v-row>
        </v-img>
        <v-container class="mb-5 pb-15">
          
          <v-row justify="center mb-5">
            <v-col
              cols="12"
              sm="10"
              md="9"
              lg="7"
              xl="5"
              class="mb-10">

                <div class="my-2 py-1 d-flex justify-space-between">
                  <v-btn 
                  color="success" 
                  elevation="6"
                  @click="agregarCultivo()">Añadir Cultivo</v-btn>
                  
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
                        <th class="text-center">{{ estado }}</th>
                        <th class="text-center">Productos de cultivo</th>
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
                        <td class="text-center">{{ item.estado }}</td>

                        <td class="text-center">
                          <button @click="verProductos(item._id)">
                            <v-icon color="#8AA39B">mdi-eye</v-icon>
                          </button>
                        </td>
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
            <v-row class="justify-center d-flex ">
              <v-sheet class="ma-2 pa-2 text-center">
                <h2 class="text-center pa-5 mb-5">GRÁFICA DE CULTIVOS DE UN CAMPO</h2>
                <BarChartCultivos/>
              </v-sheet>
            </v-row>
            <v-row class="justify-center d-flex flex-column align-center pa-10 mt-10">
              <v-sheet>
                <h2>LOCALIZACIÓN</h2>
              </v-sheet>
              <v-sheet class="pa-10">
                <div id="place"></div>
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

import axios from 'axios';
import BarChartCultivos from '@/components/BarChartCultivos.vue'
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components: { Header, FooterSinSesion, BarChartCultivos, CardDatosCampo },
        name: 'VerCultivos',
        data: () => ({
          userId: null,
          campoId: null,
          datosUser:{},
          datosCampo:{},
          datosCultivo:{},
          cultivos: [],
          titulo:"CULTIVOS",
          cantidad:"Cantidad (nº aprox)",
          hectareas:"Hectareas",
          nombre:"Nombre cultivos",
          estado:"Estado",
          tablaVacia:false,
          nCultivos:"",
          nTotalHectareasCultivos:0,
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
          //Paginacion tablas
          visiblePages () {
              const cultivosPaginados= this.cultivos.slice((this.page - 1)* this.perPage, this.page* this.perPage);
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

        

              // Cargar datos de un campo al cargar la pagina
              axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}`) 
                .then((response) =>{

                  if(response.statusText=="OK"){
                    console.log("Exito consultar campoID ");
                    this.datosCampo = response.data;                    
                    this.embedCampo =response.data.provincia;
                    this.items.text=this.datosCampo.hectareas;
                    var addr = this.datosCampo.direccion + " " + this.datosCampo.provincia;
                    var embed= "<iframe width='700' height='350' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='https://maps.google.com/maps?&amp;q="+ encodeURIComponent( addr ) + "&t=k&z=10&ie=UTF8&iwloc=&output=embed'></iframe>";
                    document.getElementById("place").innerHTML= embed;

                  }else{
                    console.log("Error cargar campos");
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
          
          // Cargar información campos
          cargarCampos(){
            
            //CONSULTA AXIOS CAMPOS
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos`)
                  .then((response) =>{
                    if(response.statusText=="OK"){
                      console.log("Exito consultar campos ");
                      this.campos = response.data;
                    }else{
                      console.log("Error");
                    }
                });
          },
        
          // Cargar información cultivos
          cargarCultivos(){
            //CONSULTAR CULTIVOS DE UN CAMPO  
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cultivos`) 
                .then((response) =>{

                  if(response.statusText=="OK"){
                
                     
                    console.log("Exito consultar cultivos ");
                    this.cultivos = response.data;
                    this.nCultivos = this.cultivos.length;
                    this.pages=response.data.length;

                    for (const hec in this.cultivos) {
                      
                        this.nTotalHectareasCultivos += this.cultivos[hec].hectareas;
                        
                    }
                    if(this.cultivos.length===0){
                      this.tablaVacia=true;
                    }
                    
                        
                  }else{
                    // info no existe
                    // Error no existe cultivo
                    console.log("Error consulta cultivo  ");
                  }

                }).catch(error =>{
                  // Error general SERVICIO FALLA 
                  // no se pueden crear los cultivos
                  console.log(error)
                }); 
            },

          //Descargar json tabla a Excel
          downloadFile: function () {
            const XLSX = require("json-as-xlsx");

            let data = [
                {
                  sheet: "Adults",
                  columns: [
                    { label: "Nombre cultivo", value: (row) => row.nombre },
                    { label: "Cantidad", value: (row) => row.cantidad + " (kg | l)" }, // Top level data
                    { label: "Fecha", value: (row) => row.date },
                    { label: "Estado", value: (row) => row.estado },

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
                    
          // Ver  productos de un cultivo
          verProductos(cultivoId){
            this.$router.push(`/user/${this.campoId}/cultivos/${cultivoId}/productos`);
          },
          
          // Agregar cultivo
          agregarCultivo(){
            this.$router.push(`/user/${this.campoId}/cultivos/crearCultivo`);
          },
            
          // Editar cultivo
          editarCultivo(cultivoId){
            this.$router.push(`/user/${this.campoId}/cultivos/${cultivoId}/editarCultivo`);

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