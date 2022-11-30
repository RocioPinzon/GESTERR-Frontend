<template>

    <v-app-bar color="green">
       
        <v-app-bar-title>GesTerr</v-app-bar-title>

        <v-spacer></v-spacer>
        <v-menu>
        

            
          </v-menu>
        <v-btn icon>
          <v-icon @click="logout(item_id)">mdi-export</v-icon>
        </v-btn>
      </v-app-bar>

  </template>
<script>

export default {
  components: {  },
  name: 'HeaderAdmin',

  data: () => ({
    
  }),
  methods:{
    logout(){
      localStorage.removeItem=('adminId');
      this.$router.push(`/`);
    }
  }
}
</script>
