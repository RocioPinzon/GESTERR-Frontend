<template>
    <v-container>
        <v-row class="d-flex justify-center">
          <h2 class="pa-10 my-10">SERVICIOS</h2>
        </v-row>
        <v-row class="d-flex justify-center">
          
            <v-col
              cols="12"
              sm="12"
              md="4"
              lg="4"
              xl="4"
              v-for="(item, i) in items" :key="i.id">
              
                <v-sheet class="pa-2 ma-2">
                    <v-card
                    class="mx-auto"
                    max-width="400">
                      <v-img
                          class="align-end text-white"
                          height="200"
                          :src="item.src"
                          cover>
                          <v-card-title class="bg-green">{{ item.title }}</v-card-title>
                      </v-img>

                      <v-card-subtitle class="pt-4">
                          {{ item.subtitle }}
                      </v-card-subtitle>

                      <v-card-text>
                          <div>{{ item.p1 }}</div>

                          <div>{{ item.p2 }}</div>
                      </v-card-text>

                      <v-card-actions>
                          <v-btn :to=item.ruta color="orange">Ir a {{ item.button }}
                          </v-btn>
                      </v-card-actions>
                    </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
export default {
    name: "Cards",
    data: () => ({
      items: [
      { 
        id: 1,
        title: "Crear campos", 
        subtitle:"Crea campos ahora", 
        p1:"Lleva un control de los campo que tienes",
        src: require('../../assets/img/cat-campo.jpg'),
        button: "campos",
        ruta: "/user/campos"
      },
      { 
        id: 2, 
        title: "Listado Cultivos", 
        subtitle:"Visualiza todos tus cultivos", 
        src: require('../../assets/img/cat-cultivos.jpg'),
        p1:"Aquí podrás visualizar todos tus cultivos creados.",
        button: "cultivos",
        ruta:"/user/cultivos"
      },
      { 
        id: 3 , 
        title: "Listado Productos", 
        subtitle:"Visualiza todos tus productos", 
        p1:"En esta sección podrás ver todos productos.",
        src: require('../../assets/img/cat-productos.jpg'),
        button: "productos",
        ruta:"/user/productos"
      }
    ],
      
  }),
}
</script>