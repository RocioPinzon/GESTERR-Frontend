<template>
  <HeaderSinSesion/>
  <v-row justify="center">      
    <v-col
      cols="11"
      sm="9"
      md="7"
      lg="4"
      xl="3">
        <v-sheet class="pa-1 py-12 mx-0" rounded>
          <v-card class="mx-auto px-sm-1 px-6 py-8 w-100 elevation-7">
            <v-form
              v-model="form"
              class="px-6"
              @submit.prevent="onSubmit">
              
              <div class="ma-4">
                <v-img
                      class="mx-auto"
                      width="200"
                      :aspect-ratio="1"
                      src="../assets/img/logo-form.png"
                      container>
                  </v-img>
              </div>

              <v-card-title>
                <p class="text-center py-10 text-h4">Iniciar sesión </p>
              </v-card-title>
              
              <v-text-field
                  id="email" 
                  name="email"
                  type="text"
                  label="Email"
                  v-model="user.email"
                  :rules="emailRules"
                  :readonly="loading"
                  variant="outlined"
                  clearable
                  counter
                  required>
              </v-text-field>

              <v-text-field
                  id="password" 
                  name="password"
                  :type="show1 ? 'text' : 'password'"
                  label="Contraseña"
                  v-model="user.password"
                  :rules="passwordRules"
                  :readonly="loading"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  variant="outlined"
                  clearable
                  counter
                  @click:append="show1 = !show1"
                  required>

              </v-text-field>
                           
              <v-btn
                :loading="loading"
                block
                color="success"
                size="large"
                type="submit"
                clearable
                variant="elevated"> Entrar
              </v-btn>
            </v-form>
          </v-card>
        </v-sheet>

        <v-sheet v-if="error">
          <v-alert
            density="comfortable"
            type="error"
            variant="tonal">
            {{ errorMsg }}
          </v-alert>
        </v-sheet>

  </v-col>
</v-row>
<Footer/>
</template>

<script>

import HeaderSinSesion from '../components/layouts/menus/HeaderSinSesion.vue';
import Footer from '@/components/layouts/footers/Footer.vue'

import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user/signin";

export default {
  components:{HeaderSinSesion,Footer},
  name: 'Signin',
  data: () => ({
    user: {
            email: "",
            password: ""
    },
    show1: false,
    show2: true,

    // Validaciones
    valid: true,
    emailRules: [
      v => !!v || 'Email requerido',
      v => (v && v.length <= 25) || 'EL email debe tener al menos 20 caracteres'  
    ],

    passwordRules:[
            v => (v && v.length >= 5 || v.length <= 20) || 'La contraseña debe tener al menos 5 caracteres'
    ],

    //Mensaje error
    errorMsg:"",
    error:false   
  }),

  methods: {
    onSubmit () { 
      
     var paylod = {
        email: this.user.email,
        password: this.user.password
     };
     
     axios.post(SERVER_URL_COMPROBADA,paylod) 
          .then((response) =>{

            if(response.statusText=="OK"){
              console.log("Exito login");
                
              if(response.data.admin){
                localStorage.setItem('adminId',response.data.userId);
                this.$router.push('/admin/dashboardAdmin');
              }else{
                localStorage.setItem('userId',response.data.userId);
                this.$router.push('/user/dashboard');
              }
              
            }else{
                // Error no existe Contraseña o email 
                this.errorMsg="Contraseña o email incorrectos";
            }
          })
          .catch(error => {
                // Error general servicio 
                this.error=true;
                this.errorMsg="Contraseña o email incorrectos";
                console.log(error);
          });
    }
  }
}
</script>
