<template>
 
        <v-img
            src="../assets/img/parallax.png"
            cover
            class="text-white">

                    <v-main src="../assets/img/parallax.png">
        <v-container class="">
          <v-row justify="center" class="d-flex align-center pa-10">
            <v-sheet class="d-flex justify-center my-15">
                <v-card  elevation="7" variant="outlined" class="pa-7" width="400">
                <v-img
                    height="200"
                    src="../assets/img/aviso-no-encontrado.png"
                    
                    class="text-white">

            
                </v-img>
                <v-card-title class="mt-5">
                    AVISO
                </v-card-title>
                <v-card-subtitle>
                    <p>Ops. La ruta a la que intenta acceder no existe. </p>
                </v-card-subtitle>
                
                    <v-card-actions class="mt-5">
                        <v-btn @click="volver()">Volver al incio</v-btn>
                    </v-card-actions>
                
            </v-card> 
            </v-sheet>
          
        </v-row>
      </v-container>
      </v-main>
        </v-img>

    
    </template>

    <script>
      
    export default {
        name: 'Dashboard',
        data: () => ({
          
          
        }),
        methods:{
            volver(){
                this.$router.push(`/user/dashboard`);
            },
            menu(){
                if(response.data.admin){
                    localStorage.setItem('adminId',response.data.userId);
                    this.$router.push('/admin/dashboardAdmin');
                    }else{
                    localStorage.setItem('userId',response.data.userId);
                    this.$router.push('/user/dashboard');
                    }
            }

        }

    }
    </script>

