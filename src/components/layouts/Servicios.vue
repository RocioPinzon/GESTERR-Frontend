<template>
        <v-timeline >

        <v-timeline-item
            dot-color="green"
            fill-dot
        >
            <v-card>
                <v-card-title class="bg-green">
                    <v-icon
                    size="large"
                    class="py-5 mr-4 "
                    icon="mdi-magnify"
                    ></v-icon>
                    <h2 class="py-3 font-weight-light">
                    Gestiona tus campos
                    </h2>
                </v-card-title>
                <v-card-text class="py-5">
                    Con tan solo unos clics puedes llevar la gestión de tus campos y los cultivos que tengas.
                </v-card-text>
            </v-card>
        </v-timeline-item>

        <v-timeline-item
            dot-color="green green-lighten-1"
            fill-dot
            size="x-small">
            <v-card>
                <v-card-title class="bg-green">
                    <v-icon
                    size="large"
                    icon="mdi-home-outline"
                    ></v-icon>
                    <h2 class="py-5 font-weight-light">
                    Optimiza tus cultivos
                    </h2>
                </v-card-title>
                <v-card-text class="py-5">
                    Mejora la productividad de los productos que generan tu cultivos. Organiza las tareas en base a las necesidades de cada cuñtivo y mejora rendimientos.
               </v-card-text>
            </v-card>
        </v-timeline-item>

        <v-timeline-item
            dot-color="green"
            fill-dot>
            <v-card>
                <v-card-title class="bg-green">
                    <v-icon
                    class="mr-4"
                    size="large"
                    icon="mdi-email-outline"
                    ></v-icon>
                    <h2 class="py-5 font-weight-light">
                    Genera informes
                    </h2>
                </v-card-title>
                <v-card-text class="py-5">
                    Obtén informes semanales, mensuales y trimestrales de las graficas generadas de tus productos.

                </v-card-text>
            </v-card>
        </v-timeline-item>

        <v-timeline-item
            dot-color="green"
            fill-dot
            size="x-small" >
            <v-card>
                <v-card-title class="bg-green">
                    <v-icon
                    size="large"
                    icon="mdi-account-multiple-outline"
                    ></v-icon>
                    <h2 class="py-5 font-weight-light">
                    Title 4
                    </h2>
                </v-card-title>
                <v-card-text class="py-5">
                    Lorem ipsum dolor sit amet, no nam oblique. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                </v-card-text>
            </v-card>
        </v-timeline-item>
    </v-timeline>

  </template>

<script>
export default {
  name: 'Servicios',
  data () {
    return {
      items: [

      ]
    }
  }
}
</script>
