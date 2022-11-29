<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, i) in items" :key="i.id">
        <v-sheet class="pa-2 ma-2">
          <v-card
            class="mx-auto"
            max-width="350">

            <v-img
              v-model="img"
              :src="item.src"
              height="150px"
              cover></v-img>
        
            <v-card-title>
              {{ item.title }}
            </v-card-title>
        
            <v-card-subtitle>
              {{ item.subtitle }}
            </v-card-subtitle>
        
            <v-card-actions>
              <v-btn
                color="green"
                variant="text">
                Ver más
              </v-btn>
        
              <v-spacer></v-spacer>
        
              <v-btn
                color="green"
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="item.show = !item.show">
              </v-btn>
            </v-card-actions>
        
            <v-expand-transition>
              <div v-show="item.show">
                <v-divider></v-divider>  
                <v-card-text>
                  {{ item.descripcion }}
                </v-card-text>
              </div>
            </v-expand-transition>
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
        subtitle:"Crea campos personalizados", 
        descripcion:"Crea terrenos donde podrás crear cultivos, monitorizar el estado de tus campos. ",
        src: require('../../assets/img/cat-campo.jpg'),
        show: false,
      },
      { 
        id: 2, 
        title: "Cultivos", 
        subtitle:"Monitoriza tus cultivos", 
        descripcion:"Podrás seguir el desarollo de tus cultivos. Aanaliza los tiempos de cosecha.",
        src: require('../../assets/img/cat-cultivos.jpg'),
        show: false,
      },
      { 
        id: 3 , 
        title: "Productos", 
        subtitle:"Analiza tu productividad", 
        descripcion:"Mejora la calidad de tus productos y optimiza tus productos generados.",
        src: require('../../assets/img/cat-productos.jpg'),
        show: false,
      },
      { 
        id: 4 , 
        title: "Informes", 
        subtitle:"Genera informes periódicos", 
        descripcion:"Genera informes de las gráficas de forma periodica.",
        src: require('../../assets/img/cat-informes.jpg'),
        show: false,
      }
    ],
      
  }),
}
</script>