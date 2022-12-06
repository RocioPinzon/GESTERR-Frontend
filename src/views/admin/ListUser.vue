<template> 
    <HeaderAdmin/>
        <v-layout>
          <v-main>
            <v-img cover height="450" 
                src="../../assets/img/parallax.png">
              <v-row justify="center" class="mt-16 d-flex align-center pa-10">
                <v-sheet elevation="6" class="mt-16 pa-2 align-self-end">
                  
                    <h2 class="text-center pa-10">{{ titulo }}</h2>
                  
                </v-sheet>
              </v-row>
            </v-img>
            <v-container class="my-5">
                           
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="10"
                  md="9"
                  lg="7"
                  xl="5">
                    
                  
                    <v-table class="sortable my-10 elevation-5">
                      <thead>
                        <tr class="bg-green">
                          <th class="text-center">Nombre</th>
                          <th class="text-center">email</th> 
                          <th class="text-center">Fecha de ingreso</th> 
                          <th class="sorttable_nosort text-center">Eliminar</th>
                        </tr>
                      </thead>

                        <tbody>
                          <tr
                            v-for="item in usuarios"
                            :key="item._id" >
                            <td class="text-center">{{ item.name }}</td>
                            <td class="text-center">{{ item.email }}</td>
                            <td class="text-center">{{ item.date.slice(0, 10) }}</td>
                            <td class="text-center">
                             
                              <button variant="flat" @click="eliminarUsuario(item._id)">
                                <v-icon color="error">mdi-trash-can</v-icon>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    
                  </v-col>
                </v-row>         
            </v-container>
          </v-main>
        </v-layout>
      <FooterSinSesion/>
    </template>
    
    
    <script>
        
        import HeaderAdmin from '../../components/layouts/menus/admin/HeaderAdmin.vue';
        import FooterSinSesion from '@/components/layouts/footers/FooterSinSesion.vue';

        const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com";
        import axios from 'axios';
        const Swal = require('sweetalert2');
    
        export default {
        components: { HeaderAdmin, FooterSinSesion },
            name: 'DashboardAdmin',
            data: () => ({
              userId: null,
              usuarios:[],
              datosUser:{},
              titulo: "LISTADO USUARIOS"
              
            }),
            mounted(){   
              this.comprobarUsuario();
              
              this.cargarUsuarios();  
    
              axios.get(`${SERVER_URL_COMPROBADA}/user/${this.userId}`)
                .then((response) =>{
                  if(response.statusText=="OK"){
                    console.log("Exito consultar datos del usuario ");      
                    this.datosUser = response.data;
                  }else{
                    console.log("Error");
                  }
                });
    
                axios.get(`${SERVER_URL_COMPROBADA}/user`)
                .then((response) =>{
                  if(response.statusText=="OK"){
                    console.log("Exito consultar datos de los usuarios en mounted ");      
                    this.usuarios = response.data;
                  }else{
                    console.log("Error");
                  }
                });
    
                //  SCRIPT PARA LLAMAR SORT
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
              cargarUsuarios(){
                  //CONSULTAR usuarios
                  axios.get(`${SERVER_URL_COMPROBADA}/user`)
                                .then((response) =>{
    
                                  if(response.statusText=="OK"){
                                    console.log("Exito consultar usuarios en methods ");
                                    this.usuarios = response.data;
                                  }else{
                                    console.log("Error ");
                                  }
    
                              });
                },
    
                comprobarUsuario(){
                  this.userId=localStorage.getItem('adminId'); 
                  if(!this.userId){
                  this.$router.push(`/signin`);
     
                  } 
                },
                async eliminarUsuario(userId){
                  const result = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: "Si elimina, no podrá recuperar a este usuario.",
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
                      axios.delete(`${SERVER_URL_COMPROBADA}/user/${userId}`) 
                        .then(async(responseDelete) =>{
    
                          if(responseDelete.statusText=="OK"){
                            Swal.fire(
                              'Eliminado!',
                              'Usuario ha sido eliminado.',
                              'success'
                            )
                            this.cargarUsuarios();
    
                            console.log("Exito borrar usuario");  
                            
                          }else if(result.dismiss === Swal.DismissReason.cancel){
                            Swal.fire(
                                  'Cancelado',
                                  'Your imaginary file is safe :)',
                                  'error')
                          }else{
                            
                            console.log("Error borrando usuario ");
                          }
                        });
                }
            }
     
        }
      </script>