<template> 
<HeaderAdmin/>
    <v-layout>
      <v-main>
        <v-container class="my-5">
          <v-row justify="center">
            <v-col
              cols="4">
              <h2 class="text-center py-10">USUARIOS</h2>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
              cols="6">

              <v-sheet class="ma-2 pa-2">
                <v-table class="elevation-2">
                  <thead>
                    <tr class="bg-green">
                      <th class="text-left">
                        Nombre
                      </th>
                      <th class="text-left">
                        email
                      </th>                     
                    </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in usuarios"
                        :key="item._id" >
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-sheet>
              </v-col>
            </v-row>         
        </v-container>
      </v-main>
    </v-layout>
</template>


<script>
    import HeaderAdmin from '../../components/layouts/menus/admin/HeaderAdmin.vue';
    const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com";
    import axios from 'axios';

    export default {
    components: { HeaderAdmin },
        name: 'DashboardAdmin',
        data: () => ({
          userId: null,
          usuarios:[],
          datosUser:{}
          
        }),
        mounted(){   
          this.comprobarUsuario();
          
          this.cargarUsuarios();  

          axios.get(`${SERVER_URL_COMPROBADA}/user/${this.userId}`)
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
          cargarUsuarios(){
              //CONSULTAR usuarios
              axios.get(`${SERVER_URL_COMPROBADA}/user`)
                            .then((response) =>{

                              if(response.statusText=="OK"){
                                console.log("Exito consultar usuarios ");
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
            }
        }
 
    }
  </script>