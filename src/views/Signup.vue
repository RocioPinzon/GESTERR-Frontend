<template>
    <v-row justify="center">      
        <v-col
            cols="11"
            sm="9"
            md="6"
            lg="5"
            xl="3">
            <v-sheet class="pa-1 py-12 mx-0">
                <v-card class="mx-auto px-sm-1 px-6 py-8 w-100 elevation-7">
                    <v-form
                        v-model="form"
                        @submit.prevent="onSubmit">
                        
                        <v-card-text 
                            outlined>
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
                                <p class="text-center py-10 text-h2">Regístrate</p>
                            </v-card-title>
                                
                            <v-text-field
                                ref="nombre"
                                v-model="nombre"
                                :rules="nameRules"
                                :error-messages="errorMessages"
                                :counter="10"
                                :readonly="loading"
                                label="Nombre"
                                placeholder="Nombre"
                                clearable
                                variant="outlined"
                                required>
                            </v-text-field>

                            <v-text-field
                                ref="ape"
                                v-model="apellidos"
                                :rules="apeRules"
                                :counter="10"
                                :error-messages="errorMessages"
                                :readonly="loading"
                                label="Apellidos"
                                placeholder="Apellidos"
                                variant="outlined"
                                clearable
                                required>
                            </v-text-field>
                               
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                :readonly="loading"
                                label="E-mail"
                                variant="outlined"
                                clearable
                                required>
                            </v-text-field>
                            
                            <v-text-field
                                ref="username"
                                v-model="username"
                                :rules="userNameRules"
                                :error-messages="errorMessages"
                                :readonly="loading"
                                label="Username"
                                placeholder="Username"
                                variant="outlined"
                                clearable
                                required>
                            </v-text-field>
                                    
                            <v-text-field
                                id="password" 
                                name="password"
                                v-model="password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="passwordRules"
                                :readonly="loading"
                                label="Contraseña"
                                :type="show1 ? 'text' : 'password'"    
                                variant="outlined"
                                counter
                                clearable
                                @click:append="show1 = !show1"
                                required>
                            </v-text-field>

                            <v-text-field
                                id="passwordConfirm" 
                                name="passwordConfirm"
                                v-model="passwordConfirm"
                                :rules="passwordConfirmRules"
                                :readonly="loading"
                                :type="password"
                                label="Confirmar contraseña"
                                variant="outlined"
                                counter
                                clearable
                                required>
                            </v-text-field> 
                   
                            <div id="mensajeError">
                                    
                            </div>
                                
                            <div id="mensajeSuccess">
                            
                            </div> 
                           
                            <v-checkbox
                                v-model="checkbox"
                                :readonly="loading"
                                type="submit"
                                label="¿Recordar contraseña?"
                                required>
                            </v-checkbox>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                
                            <v-btn
                                :disabled="!form"
                                :loading="loading"
                                color="success"
                                size="large"
                                type="submit"
                                variant="elevated"> Registrarme
                            </v-btn>
                        </v-card-actions>
                    </v-form>   
                </v-card> 
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
    import axios from 'axios';

    //const SERVER_URL = "https://gesterr-back.herokuapp.com/user/signup";
    //const SERVER_URL = "https://gesterr-back.herokuapp.com/users/signup";
    const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user/signup";
    export default {
        data: () => ({
           
            nombre: "",
            apellidos: "",
            email: "",
            username:"",
            password: "",
            passwordConfirm:"",
            valid: true,
            errorMessages: '',
            checkbox:false,
            form: false,
            loading: false,
            show1: false,
            show2: true,
            
        nameRules:[
            v => !!v || 'Nombre requerido',
            v => (v && v.length <= 10) || 'El nombre debe tener como máximo 10 caracteres'
        ],
        apeRules:[
            v => !!v || 'Apellido requerido',
            v => (v && v.length <= 15) || 'El apellido debe tener como máximo 15 caracteres'
        ],
        userNameRules:[
            v => !!v || 'Username requerido'
        ],
        emailRules: [
            v => !!v || 'E-mail requerido',
            v => /.+@.+/.test(v) || 'E-mail tiene que ser válido',
            v => (v && v.length <= 20) || 'El email debe tener como máximo 20 caracteres'
        ],
        passwordRules:[
            v => (v && v.length <= 5) || 'La contraseña debe tener al menos 8 caracteres'

        ],
        passwordConfirmRules:[
            v => (v && v.length <= 5) || 'La contraseña debe tener al menos 8 caracteres'
        ]
    }),

    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
        onSubmit () {
            if (!this.form) return

            this.loading = true

            setTimeout(() => (this.loading = false), 2000)

            console.log("Formulario enviado");
            this.created();
            //SERVER_URL_COMPROBADA
/*
            fetch(SERVER_URL)
                .then(response => response.json())
                .then(data=>{
                    //this.name = data;
                    console.log(data);
                    console.log("-------------------");
                    console.log(data[0]);
                    console.log("-------------------");
                    console.log(data[0].name);

                    //console.log(this.name);

                    for (const element of data) {

                        console.log("-------------------");
                        console.log(element);
                        console.log("-------------------");
                        console.log(element.name);
                        let contador  = 1;
                        this.items.push({title:element.name, value:contador});
                        contador++;
                        
                    }
                });*/       
        },
        created() {           
                // ERROR CORS. NECESITO USAR FETCH
                    // POST request using fetch()
                    fetch(SERVER_URL_COMPROBADA, {
                        
                        // Adding method type
                        method: "POST",
                        
                        // Adding body or contents to send
                        body: JSON.stringify({
                            "name": this.nombre,
                            "apellidos":this.apellidos,
                            "email": this.email,
                            "username":this.username,
                            "password": this.password,
                            "confirmPassword": this.passwordConfirm,
                            }),
                        
                        // Añadiendo headers al request
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "cache-control":"no-cache"
                        }
                    })
                    
                    // Convertimos a JSON
                    .then(response => response.json())
                    
                    // Displaying results to console
                    //.then(json => console.log(json));
                    .then(json => {
                        document.getElementById("mensajeError").mensajeError= json.error;
                        document.getElementById("mensajeSuccess").mensajeSuccess= json.msg;
                        //this.$router.push('/signin')
                        console.log(json);
                    })                 
                }
    },
}
  
</script>