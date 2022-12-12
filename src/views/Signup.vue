<template>
    <HeaderSinSesion/>
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
                                v-model="name"
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
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="passwordConfirmRules"
                                :readonly="loading"
                                :type="show1 ? 'text' : 'password'"
                                label="Confirmar contraseña"
                                variant="outlined"
                                counter
                                clearable
                                @click:append="show1 = !show1"
                                required>
                            </v-text-field> 
                   
                            <div id="mensajeError">
                                    
                            </div>
                                
                            <div id="mensajeSuccess">
                            
                            </div> 
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
    <Footer/>
    
</template>

<script>
    import axios from 'axios';
    import Footer from '@/components/layouts/footers/Footer.vue'

    const SERVER_URL_COMPROBADA = "https://gesterr-back.herokuapp.com/user/signup";
    import HeaderSinSesion from '../components/layouts/menus/HeaderSinSesion.vue';

    export default {
    components:{HeaderSinSesion, Footer},

        data: () => ({
           
            name: "",
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
            v => !!v || 'Contraseña requerida',
            v => (v && v.length >= 8 ||  v.length <= 15) || 'La contraseña debe tener al menos 8 caracteres y menos de 15'

        ],
        passwordConfirmRules:[
            v => !!v || 'Confirmacion de contraseña requerida',
            v => (v && v.length >= 8 ||  v.length <= 15 ) || 'La contraseña debe tener al menos 8 caracteres y menos de 15'
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
                    
            var paylod = {
                name: this.name,
                apellidos: this.apellidos,
                email: this.email,
                username: this.username,
                password: this.password,
                confirmPassword: this.passwordConfirm
            };
            
            axios.post(SERVER_URL_COMPROBADA,paylod) 
            .then((response) =>{
                if(response.statusText=="OK"){
                    console.log("Exito haciendo signup");
                    this.$router.push('/signin');              
                }else{
                    console.log("Error signup");
                }
            })
            .catch(function (error){
                console.log(error);

            });
            
            
        }
    },
}
  
</script>