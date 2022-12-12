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
          <v-container class="">
  
            <v-row justify="center">
              <v-col
                cols="12"
                sm="10"
                md="9"
                lg="7"
                xl="5" 
                class="my-10">
                <div class="ma-2 py-1 d-flex justify-space-between">
                  <v-btn 
                    color="success" 
                    elevation="6"
                    @click="crearRgistroProducto()">Añadir Registro Producto</v-btn>
                    
                    <v-btn 
                      v-model="nRegistros"
                      color="success"
                      variant="tonal"
                      elevation="6">Número total de registros: {{ nRegistros }}
                    </v-btn>
                </div>
                
                <v-sheet class="ma-2 rounded" elevation="4">
                  
                  <v-table class="sortable mb-10 elevation-5">
                    <thead>
                      <tr class="bg-green">
                        <th class="text-center">{{ nombre }}</th>
                        <th class="text-center">{{ estado }}</th>
                        <th class="text-center">{{ fechaCreacion }}</th>
                      </tr>
                    </thead>
  
                    <tbody>
                      <tr
                        v-for="item in registroProductos"
                        :key="item._id" >
                        <td class="text-center">{{ item.name }}</td>
                        <td class="text-center">{{ item.estado }}</td>
                        <td class="text-center">{{ item.fechaCreacion }}</td>

                      </tr>
                    </tbody>
                  </v-table>
                </v-sheet>
                
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
<FooterSinSesion/>
</template>
    
  
  <script>
  
  import Header from '@/components/layouts/menus/user/Header.vue';  
  import FooterSinSesion from '@/components/layouts/footers/FooterSinSesion.vue';
  import axios from 'axios';
  const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user";
  const Swal = require('sweetalert2');
  
      export default {
      components: { Header, FooterSinSesion },
          name: 'VerCultivos',
          data: () => ({
            userId: null,
            registroProductos: [],
            titulo:"REGISTRO DE PRODUCTO",
            nombre:"Nombre producto",
            estado:"Estado",
            fechaCreacion:"Fecha",
            page:1,
            pages:[],
            perPage:4,
            nRegistros:""
            
          }),
          computed: {
            visiblePages () {
                const productoPaginados= this.productos.slice((this.page - 1)* this.perPage, this.page* this.perPage);
                console.log("productoPaginados");
  
                console.log(productoPaginados);
                
               return productoPaginados;
            }
          },
          mounted(){
            this.comprobarUsuario();  
   
            this.campoId = this.$route.params.campoId;
            this.cultivoId = this.$route.params.cultivoId;

            this.cargarRegistroProductos(); 
  
            axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}`)
              .then((response) =>{
  
                if(response.statusText=="OK"){
                  console.log("Exito consultar datos usuario ");
                  this.datosUser = response.data;
                  
                }else{
                  console.log("Error");
                }
  
              });  
  
              // Consultar datos Registro Producto
              axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cutivos/${this.cultivoId}/registroproductos`) 
                .then((response) =>{
                    
                if(response.statusText=="OK"){
                    console.log("Exito consultar producto " + this.cultivoId);
                    this.registroProductos = response.data;
                    console.log(this.registroProductos);
  
                    //this.pages=response.data.length;
                    //console.log(this.pages);
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
                      { label: "Nombre producto", value: (row) => row.name + "." },
                      { label: "Cantidad", value: (row) => row.cantidad + "." }, // Top level data
                      //{ label: "Fecha", value: (row) => row.date + "." },
                    ],
                    content: this.registroProductos,
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
              cargarRegistroProductos(){
  
              //CONSULTAR PRODUCTOS CULTIVO  
              axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cutivos/${this.cultivoId}/registroproductos`) 
                  .then((response) =>{
  
                    if(response.statusText=="OK"){
                      console.log("Exito consultar productos ");
                      this.registroProductos = response.data;
  
                    }else{
                      console.log("Error al consultar todos los productos. ");
                    }
  
                  }); 
              },

              cargarRegistroProductos(){
  
              //CONSULTAR PRODUCTOS CULTIVO  
              axios.get(`${SERVER_URL_COMPROBADA}/${this.userId}/campos/${this.campoId}/cutivos/${this.cultivoId}/productos`) 
                  .then((response) =>{
  
                    if(response.statusText=="OK"){
                      console.log("Exito consultar productos ");
                      this.registroProductos = response.data;
  
                    }else{
                      console.log("Error al consultar productos de un cultivo. ");
                    }
  
                  }); 
              },
                            
              crearRgistroProducto(){
                this.$router.push(`/user/${this.campoId}/cultivos/${this.cultivoId}/registroproductos/crearregistro`);

              },
  
          }
      }
    </script>