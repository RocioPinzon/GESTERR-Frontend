<template>
  <Header/>
    <v-layout>
      <v-main>
        <v-img cover height="425" 
                src="../../../assets/img/parallax.png">
          <v-row justify="center" class="mt-16 d-flex align-center pa-10">
            <v-sheet class="mt-16 pa-2 align-self-end">
              
                <h2 class="text-center mt-15 pa-2">{{ titulo }}</h2>
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
              class="mb-10">
              <div class="my-2 py-1 d-flex justify-space-between">
                
                <v-btn 
                  v-model="nCampos"
                  color="success"
                  variant="tonal"
                  elevation="6">Número total de productos: {{ nProductos }}
                </v-btn>
                <v-btn 
                    color="#906b51" 
                    elevation="6"
                    class="text-white"
                    @click="downloadFile">Descargar .xslx
                  </v-btn>
              </div>
              
              <v-sheet class="my-2 rounded" elevation="4">
                
                <v-table class="sortable mb-4 elevation-5">
                  <thead>
                    <tr class="bg-green">
                      <th class="text-center">{{ nombre }}</th>
                      <th class="text-center">{{ cantidad }}</th>
                      <th class="text-center">{{ precio }}</th>
                      <th class="text-center">{{ fecha }}</th>

                      <th class="sorttable_nosort text-center">Editar / Eliminar</th>
                    </tr>
                  </thead>

                  <tbody v-if="tablaVacia===false">
                    <tr
                      v-for="item in productosPage"
                      :key="item._id" >
                      <td class="text-center">{{ item.name }}</td>
                      <td class="text-center">{{ item.cantidad }}</td>
                      <td class="text-center">{{ item.precio }} €</td>
                      <td class="text-center">{{ item.fecha.slice(0, 10) }}</td>

                      <td class="text-center">
                        <v-btn variant="flat" @click="editarProducto(item._id)">
                          <v-icon color="success">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn variant="flat" @click="eliminarProducto(item._id)">
                          <v-icon color="error">mdi-trash-can</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-sheet>
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
            <v-sheet class="text-center ma-2 pa-2 text-center">
                <h2 class="text-center pa-5 mb-5">GRÁFICA DE TODOS LOS PRODUCTOS</h2>

                <BarChartTodosProductos/>
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
import BarChartTodosProductos from '@/components/BarChartTodosProductos.vue';

import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
const Swal = require('sweetalert2');

    export default {
    components: { Header, FooterSinSesion, BarChartTodosProductos },
        name: 'VerProductos',
        data: () => ({
          userId: null,
          productos: [],
          nProductos:"",
          titulo:"TODOS LOS PRODUCTOS",
          subtitulo:"Listado de todos los productos de los cultivos",
          nombre:"Nombre producto",
          precio:"Precio (€/kg)",
          fecha:"Fecha",
          textButonActualizar:"Actualizar",
          cantidad:"Cantidad (Kg)",
          page:1,
          pages:[],
          perPage:5,
          productosPage:[],
          tablaVacia:false,
          
        }),
        computed: {
          visiblePages () {
              const productoPaginados= this.productos.slice((this.page - 1)* this.perPage, this.page* this.perPage);
              console.log("productoPaginados");
              console.log(productoPaginados);

              console.log("this");
              console.log(this);
              this.productosPage = productoPaginados;              
              //return productoPaginados; para verlo en pantall como si fuera consola
          }
        },
        mounted(){
          this.comprobarUsuario();  
          this.cargarProductos(); 

          axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`)
            .then((response) =>{

              if(response.statusText=="OK"){
                console.log("Exito consultar datos usuario ");
                this.datosUser = response.data;
                
              }else{
                console.log("Error");
              }

            });  

            
           
            // FIN MOUNTED
        },
 

        methods: {
            comprobarUsuario(){
              this.userId=localStorage.getItem('userId'); 
              if(!this.userId){
                this.$router.push(`/signin`);
              } 
            },
            downloadFile: function () {
              const XLSX = require("json-as-xlsx");

              let data = [
                {
                  sheet: "Adults",
                  columns: [
                    { label: "ID Campo", value: "user" },
                    { label: "Nombre producto", value: (row) => row.name  },
                    { label: "Cantidad", value: (row) => row.cantidad }, // Top level data
                    //{ label: "Fecha", value: (row) => row.date + "." },
                  ],
                  content: this.productos,
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
            cargarProductos(){

            //CONSULTAR PRODUCTOS USER  
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/productos`) 
                .then((response) =>{

                  if(response.statusText=="OK"){
                    console.log("Exito consultar productos ");
                    this.productos = response.data;
                    this.nProductos = this.productos.length;
                    this.pages=response.data.length;
                    if(this.productos.length===0){
                      this.tablaVacia=true;
                    }
                  }else{
                    console.log("Error al consultar todos los productos. ");
                  }

                }); 
            },
            
            crearProducto(){
              this.$router.push(`/user/productos/crearProducto`);
            },

            editarProducto(productoId){
              this.$router.push(`/user/productos/${productoId}/editarProducto`);
            },

            async eliminarProducto(productoId){
              const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Si elimina, ya no podrá recuperar el producto.",
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
                  axios.delete(`${SERVER_URL_COMPROBADA}/${this.userId}/productos/${productoId}`) 
                    .then(async(responseDelete) =>{

                      if(responseDelete.statusText=="OK"){
                        Swal.fire(
                          'Eliminado!',
                          'Tu producto ha sido eliminado.',
                          'success'
                        )
                        this.cargarProductos();

                        console.log("Exito borrar productos");  
                        
                      }else if(result.dismiss === Swal.DismissReason.cancel){
                        Swal.fire(
                              'Cancelado',
                              'Your imaginary file is safe :)',
                              'error')
                      }else{
                        
                        console.log("Error borrando producto ");
                      }
                    });
            }
        }
    }
  </script>