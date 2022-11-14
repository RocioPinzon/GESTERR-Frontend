<template>
    <v-content class="d-flex justify-center ">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
                <v-img
                :width="width"
                src="require('../assets/img/logo-form.png')"
                cover
                ></v-img>
                <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Usuario"
                    required></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Contraseña"
                    required></v-text-field>

                <v-checkbox
                    v-model="checkbox"
                    label="Guardar contraseña"
                    required></v-checkbox>

                <v-btn
                    block
                    color="success"
                    class="mr-4"
                    @click="validate">
                    Entrar
                </v-btn>

            </v-form>
    </v-content>
  </template>
<script>
export default {
  name: 'Signin',
  data: () => ({
    valid: true,
    nameRules: [
      v => !!v || 'Usuario requerido',
      v => (v && v.length <= 10) || 'EL usuario debe tener al menos 5 caracteres'
    ],
    select: null,
    checkbox: false
  }),

  methods: {
    async validate () {
      const { valid } = await this.$refs.form.validate()

      if (valid) alert('Formulario válido')
    }
  }
}
</script>
