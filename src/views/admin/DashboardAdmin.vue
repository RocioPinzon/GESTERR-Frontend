<template> 
    <v-layout>
      <Navigation/>
      <Header/>
      <v-main>
        
        SOY ADMIN
        
     
      </v-main>
    </v-layout>
</template>


<script>
      
    export default {
    components: { Navigation },
        name: 'DashboardAdmin',
        data: () => ({
          userId: null
          
        }),
        mounted(){

            this.userId=localStorage.getItem('userId');  


            // FIN MOUNTED
        },
 

        methods: {
            
        }
 
    }
  </script>