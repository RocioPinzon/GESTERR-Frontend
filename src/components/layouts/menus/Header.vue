<template>

    <v-app-bar color="green1">
        <template v-slot:image>
          <v-img></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>GesTerr

        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon icon="mdi-magnify"></v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon icon="mdi-heart"></v-icon>
        </v-btn>

        <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>

            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i" >

                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>

  </template>

<script>

export default {
  name: 'Header',

  data: () => ({
    items: [
      { title: 'Campos' },
      { title: 'Cultivos' },
      { title: 'Productos' }
    ]
  })
}
</script>
