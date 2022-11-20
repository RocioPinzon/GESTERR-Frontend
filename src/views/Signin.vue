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
                  id="name" 
                  name="name"
                  v-model="user.name"
                  :counter="10"
                  :rules="nameRules"
                  :readonly="loading"
                  label="Usuario"
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
              <v-checkbox
                v-model="checkbox"
                label="Guardar contraseña"
                required>
              </v-checkbox>
              
              <v-btn
                :disabled="!form"
                :loading="loading"
                block
                color="success"
                size="large"
                type="submit"
                clearable
                variant="elevated">  HolaaEntrar
              </v-btn>
            </v-form>
          </v-card>
        </v-sheet>
  </v-col>
</v-row>
</template>

<script>

const SERVER_URL = "https://localhost:3000";

export default {
  name: 'Signin',
  data: () => ({
    user: {
            name: "",
            password: ""
    },
    valid: true,
    nameRules: [
      v => !!v || 'Usuario requerido',
      v => (v && v.length <= 10) || 'EL usuario debe tener al menos 5 caracteres'  
    ],

    passwordRules:[
            v => (v && v.length <= 8) || 'La contraseña debe tener al menos 8 caracteres'

    ],
    show1: false,
    show2: true,
    checkbox: false,
  }),

  methods: {
    async validate () {

      if(!this.user.name){
        return this.show("Escriba su nombre", {
                    position: "top-left",
                    duration: 1000,
        });
      }
      const payload = JSON.stringify(this.user);
      const url = SERVER_URL + "/user/signin";
      const r = await fetch(url, {
          method: "POST",
          body: payload,
          headers: {
            "Content-type": "application/json",
          }
      });

      const response = await r.json();
            if (response) {
                this.show("Saved", {
                    position: "top-left",
                    duration: 1000,
                });
                this.user = {
                    name: "",
                    password: null
                };
            } else {
                this.show("Something went wrong. Try again", {
                    position: "top-left",
                    duration: 1000,
                });
            }
      
    }
  },
  
}
</script>
