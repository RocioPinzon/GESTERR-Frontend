<template>
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
                <p class="text-center py-10 text-h2">Iniciar sesión  </p>
              </v-card-title>
              
              <v-text-field
                  id="email" 
                  name="email"
                  v-model="user.email"
                  :rules="emailRules"
                  :readonly="loading"
                  label="Email"
                  variant="outlined"
                  clearable
                  type="text">
              </v-text-field>

              <v-text-field
                  id="password" 
                  name="password"
                  :readonly="loading"
                  v-model="user.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordRules"
                  label="Contraseña"
                  :type="show1 ? 'text' : 'password'"
                  clearable
                  variant="outlined"
                  counter
                  @click:append="show1 = !show1"
                  required>
              </v-text-field>
              <br>
              <!--<v-checkbox
                v-model="checkbox"
                label="Guardar contraseña"
                required>
              </v-checkbox>-->
              <div id="mensajeError"></div>
                                      
              <div id="mensajeSuccess"></div> 
              <v-btn
                :disabled="!form"
                :loading="loading"
                block
                color="success"
                size="large"
                type="submit"
                clearable
                variant="elevated"
                @click="inicioSesion"> Entrar
              </v-btn>
            </v-form>
          </v-card>
        </v-sheet>
  </v-col>
</v-row>
</template>

<script>

import axios from 'axios';
const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user/signin";

export default {
  name: 'Signin',
  data: () => ({
    user: {
            email: "",
            password: ""
    },
    valid: true,
    emailRules: [
      v => !!v || 'Email requerido',
      v => (v && v.length <= 20) || 'EL email debe tener al menos 20 caracteres'  
    ],

    passwordRules:[
            v => (v && v.length <= 9) || 'La contraseña debe tener al menos 7 caracteres'

    ],
    show1: false,
    show2: true,
    checkbox: false,
  }),

  methods: {
    onSubmit () { //async antes
      if (!this.form) return

            this.loading = true

            //setTimeout(() => (this.loading = false), 2000)

            console.log("Formulario enviado");
            //this.created();
            console.log("this: ");
            console.log(this);
     var paylod = {
        email: this.user.email,
        //email: "imper@imper.es",
        password: this.user.password
     };
     
     axios.post(SERVER_URL_COMPROBADA,paylod) //await antes
     .then((response) =>{

      if(response.statusText=="OK"){
        console.log("Exito haciendo login ");

        localStorage.setItem('userId',response.data.userId);
        
        console.log("response: ");
        console.log(response);
          
        if(response.data.admin){
          this.$router.push('/admin/dashboardAdmin');
        }else{
          this.$router.push('/user/dashboard');
        }
        
      }else{

        console.log("Error haciendo login ");
      }

     });
    }
  }
}
</script>
