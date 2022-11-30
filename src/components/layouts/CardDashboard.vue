<template>
    <v-container>
        <v-row>
            <v-col v-for="(item, i) in items" :key="i.id">
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
                          <v-btn color="orange">
                            <router-link :to=item.ruta> Ir a {{ item.button }}</router-link>
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
        title: "Campos", 
        subtitle:"Crea campos ahora", 
        p1:"Lleva un control de los campo que tienes",
        src: require('../../assets/img/cat-campo.jpg'),
        button: "campos",
        ruta: "/user/campos"
      }/*,
      { 
        id: 2, 
        title: "Cultivos", 
        subtitle:"Crea todo tipo de cultivos", 
        src: require('../../assets/img/cat-cultivos.jpg'),
        p1:"Seguimiento de los diferentes cultivos.",
        button: "cultivos"
      }*/,
      { 
        id: 3 , 
        title: "Productos", 
        subtitle:"Crear productos", 
        p1:"Analiza tus productos en esta página",
        src: require('../../assets/img/cat-productos.jpg'),
        button: "productos",
        ruta:"/user/productos"
      }
    ],
      
  }),
}
</script>